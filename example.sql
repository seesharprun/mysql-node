USE localdb;

DROP TABLE IF EXISTS employees; 

CREATE TABLE employees( 
	id int(11) NOT NULL AUTO_INCREMENT, 
	name varchar(50), 
	location varchar(50), 
	PRIMARY KEY (id)
); 

INSERT INTO employees 
	(id, name, location) 
VALUES 
	(1, 'Jasmine', 'Australia'), 
	(2, 'Jay', 'India'), 
	(3, 'Jim', 'Germany'), 
	(4, 'Lesley', 'Scotland');
