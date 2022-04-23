INSERT INTO department (department_name)
VALUES 
('Human Resources'), 
('Student Services'), 
('Financial Aid'), 
('Business Office');

INSERT INTO department_role (title, salary, department_id)
VALUES 
('Human Resources Representative', 54000, 1), 
('Academic Advisor', 45000, 2), 
('Senior Director', 120000, 2), 
('Financial Counselor', 50000, 3), 
('Secretary', 36000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Kevin', 'Jonas', 1, null), 
('Joe', 'Jonas' 2, 3), 
('Priyanka', 'Chopra Jonas' 2, 3),
('Nick', 'Jonas', 3, null), 
('Frankie', 'Jonas', 4, null), 
('Sophie', 'Turner' 5, null);