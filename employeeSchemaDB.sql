DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles(
  id INT NOT NULL AUTO_INCREMENT,
  department_id INT NOT NULL ,
  title VARCHAR(45) NOT NULL,
  salary DECIMAL (6,2) NOT NULL,
  PRIMARY KEY (id),
FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employees(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(45) NOT NULL,
  last_name VARCHAR(45) NOT NULL,
  role_id INT ,
  manager_id INT ,
  PRIMARY KEY (id),
FOREIGN KEY(role_id) REFERENCES roles(id),
FOREIGN KEY(manager_id) REFERENCES employees(id)
);

INSERT INTO department (name)
VALUES
  ('Human Resorce'),
  ( 'Sales'),
  ('Legal'),
  ('IT'),
  ('Management');


 INSERT INTO roles ( title , salary , department_id )
VALUES
 ('Sales Manager',3000,2),
  ( 'Engineer',2500,4),
  ('Lawyer',4000,3),
  ('Project Manager',3500,4),
  ('HR admin',2800,1);

 INSERT INTO employees (  first_name, last_name, role_id ,manager_id) 
VALUES
 ('Pedro','Perez',2,NULL),
 ('Mirta','Rodriguez',2,1),
 ('Abdul','Valdes',1,NULL),
 ('Lorenzo','Ascencion',3,NULL),
 ('Steve','Lee',4,NULL);
 
SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;