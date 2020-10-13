DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    dep_name VARCHAR(30),
    PRIMARY KEY (id),
    
);

CREATE TABLE roles (
    id INT () AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4),
    dep_id INT () NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (dep_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

