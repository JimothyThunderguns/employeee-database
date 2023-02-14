INSERT INTO department (name)
VALUES ('Engineering'), ('Finance'), ('Sales'), ('Design');

INSERT INTO role (title, salary, department_id )
VALUES 
('Engineer', 85000, 1),
('Finance Manager', 75000, 2),
('Salesperson', 99000, 3),
('Designer', 75000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Yul', 'Brynner', 1, NULL),
('Bronson', 'Charles', 2, 1),
('Steve', 'McQueen', 3, 1),
('Daniel', 'Plainview', 4, 2),
('Caleb', 'Colton', 3, NULL),
('Nora', 'Valkyrie', 4, 2);
