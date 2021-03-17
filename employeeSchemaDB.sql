DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;
CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NOT NULL,
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

INSERT INTO department (department_name)
VALUES
  ('Human Resources'),
  ( 'Sales'),
  ('Legal'),
  ('IT');


 INSERT INTO roles ( title , salary , department_id )
VALUES
 ('Sales Lead', 9000, 2),
  ('Salesperson', 6000, 2),
  ('Lead Engineer', 9000, 4),
  ('Software Engineer', 7500, 4),
  ('Account Manager', 9500, 1),
  ('Legal Lead', 9000, 3),
  ('Lawyer', 8500, 3);

 INSERT INTO employees (  first_name, last_name, role_id , manager_id) 
VALUES
 ('Billy', 'Baggins', 1, NULL),
 ('Johnathan', 'Doe', 2, 1),
 ('Brandon', 'Carter', 3, NULL),
 ('Rando', 'Person', 4, 3),
 ('Biggie', 'Smalls', 5, NULL),
 ('Mary', 'Sue', 6, NULL),
 ('Alex', 'Smith', 7, 6);
 
SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;