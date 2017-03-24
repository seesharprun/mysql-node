var util = require('util');
var http = require('http');
var mysql = require('mysql');
var mu = require('mu2');

mu.root = __dirname + '/templates';

var nodePort = process.env.PORT || 3333;
var connectionString = process.env.MYSQLCONNSTR_localdb;

var host = /Data Source=([0-9\.]+)\:[0-9]+\;/g.exec(connectionString)[1];
var port = /Data Source=[0-9\.]+\:([0-9]+)\;/g.exec(connectionString)[1];
var database = /Database=([0-9a-zA-Z]+)\;/g.exec(connectionString)[1];
var username = /User Id=([a-zA-z0-9\s]+)\;/g.exec(connectionString)[1];
var password = /Password=(.*)/g.exec(connectionString)[1];

var exampleSql = "";

var connection = mysql.createConnection({
  host     : host,
  port     : port,
  user     : username,
  password : password,
  database : database,
  debug    : true
});
 
var server = http.createServer(function (request, response) {  
  
  response.writeHead(200, {'Content-Type': 'text/html'});
  
  var title = '';
  var message = '';
  var data = [];

  connection.connect();  
    
  connection.query('SELECT * FROM employees', function (error, results, fields) {
    if (error) {  
      title += "Error";    
      message += error;
    }
    else {
      title += "Connection Established";
      data = results;
      message += connectionString;      
    }
    mu.compileAndRender('index.html', {
      title: title,
      message: message,
      data: data
    }).pipe(response);
  }); 
  
});

server.listen(nodePort);

console.log('Server running on http://localhost:' + nodePort);
