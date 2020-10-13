USE employee_tracker_db;

INSERT INTO department(dep_name)
VALUES
(`Engineering`),
('Finance'),
('CSR');


INSERT INTO roles (title, salary, dep_id)
VALUES 
("I.T.", 46000, 1),
('Accountant', 78000, 2),
('Representative', 44000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Nathan", "Schmitzer", 1, NULL),
("Billy", "Joe", 2, NULL),
("Jesaline", "Bethel", 3, NULL);