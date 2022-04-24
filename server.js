const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./config/connection');

//connect to database
connection.connect((err) => {
    if (err) throw err;
    listOptions();
})

//prompts

const options = [
    {
        type: 'list',
        name: 'options',
        message: "What would you like to do?",
        choices: [
            'view all departments', 
            'view all roles', 
            'view all employees', 
            'add a department', 
            'add a role', 
            'add an employee',  
            'update an employee role',
            'exit'
        ]
    }
];

const depOptions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please type a name for the new department.',
        // validate: validate.validateString
    }
];

const rolOptions = [
    {
        type: 'input',
        name: 'title',
        message: 'Please type the title for the new role.'
        // validate: validate.validateString
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please type the salary for the new role.'
        
    },
    {
        type: 'input',
        name: 'department',
        message: 'Please type which department the role belongs to.'
    }
];

const empOptions = [
    {
        type: 'input',
        name: 'first',
        message: "Please type the employee's first name."
        // validate: validate.validateString
    },
    {
        type: 'input',
        name: 'last',
        message: "Please type the employee's last name."
        
    },
    {
        type: 'input',
        name: 'role',
        message: 'What role does this employee have?'
    },
    {
        type: 'input',
        name: 'manager',
        message: "Who is the employee's manager?"
    }
];


//run prompts 
function listOptions() {
inquirer
    .prompt(options)
    .then((answers) => {
        if (answers.options === 'view all roles') {
            // console.log('view');
            viewRol();

        } else if (answers.options === 'view all departments') {
            // console.log('view dep');
            viewDep();

        } else if (answers.options === 'view all employees') {
            // console.log('view emp');
            viewEmp();

        } else if (answers.options === 'add a department') {
            // console.log('add dep');
            createDep();

        } else if (answers.options === 'add a role') {
            // console.log('add role');
            createRole();

        } else if (answers.options === 'add an employee') {
            createEmp();

        } else if (answers.options === 'update an employee role') {
            updateEmp();

        } else if (answers.options === 'exit') {
            connection.end();
        }

    })
    .catch((error) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.log('error')
        } else {
          // Something else went wrong
          console.log('error 2');
        }
      });

    };

 //function for viewing all departments
 function viewDep() {
     var depQuery = 'SELECT * FROM department';
     connection.query(depQuery, (err, res) => {
         if (err) throw err;
         console.table(res);
         listOptions();
     });
 };

 //function for viewing all roles
 function viewRol() {
    var rolQuery = 'SELECT * FROM role';
    connection.query(rolQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        listOptions();
    });
};

 //function for viewing all employees
 function viewEmp() {
    var empQuery = 'SELECT * FROM employee';
    connection.query(empQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        listOptions();
    });
};

 //function for adding a department
function createDep() {
    inquirer
        .prompt(depOptions)
        .then((answer) => {
            var addDep =
            `INSERT INTO department (department_name) VALUES ('${answer.name}')`;
            connection.query(addDep, (err, res) => {
                if (err) throw err;
                console.log(`${answer.name} has been added as a new department!`)
                viewDep();
            });
        });
};

 //function for adding a role
 function createRole() {
     inquirer
        .prompt(rolOptions)
        .then((answers) => {

            var depId = `SELECT id FROM department WHERE department_name = '${answers.department}'`;

            connection.query({ sql: depId, rowsAsArray: true }, (err, results, fields) => {
                if (err) throw err;

                let string = results[0].toString();

                var addRole =
                    `INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}', '${answers.salary}', ${string})`;
                connection.query(addRole, (err, res) => {
                    if (err) throw err;
                    console.log(`${answers.title} has been added as a new role`);
                    viewRol();
                });
            });
        });
 };

 //function for adding an employee

 function createEmp() {
     inquirer
     .prompt(empOptions)
     .then((answers) => {
        let rolId = `SELECT id FROM role WHERE title = '${answers.role}'`;

        connection.query({ sql: rolId, rowsAsArray: true }, (err, results, fields) => {

            if (err) throw err;

                let rolString = results[0].toString();

            var addEmp = 
            `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answers.first}', '${answers.last}', ${rolString})`;
         connection.query(addEmp, (err, res) => {
             if (err) throw err;
             console.log(`${answers.first} ${answers.last} was added!`)
             viewEmp();
         });
        });
     });
 };

 //function for updating an employee role

 function updateEmp() {
    var empQuery = 'SELECT * FROM employee';
    connection.query({ sql: empQuery, rowsAsArray: true }, (err, res, fields) => {
        if (err) throw err;
        let empArray = [];

        for (let i = 0; i < res.length; i++) {
            empArray.push(res[i].slice(1,3).join(' '));
        }

        inquirer
        .prompt([
            {
            type: 'list',
            name: 'employee',
            message: "Which employee's role do you want to update?",
            choices: empArray
            },
            {
            type: 'input',
            name: 'role',
            message: 'Please type their new role'
            }
        ])
        .then((answer) => {
            connection.query( 
            `UPDATE employee
            SET role_id = (SELECT id FROM role WHERE title = '${answer.role}')
            WHERE id = (SELECT id FROM (SELECT id FROM employee WHERE CONCAT(first_name," ",last_name) = '${answer.employee}') AS tmptable)`, (err,results) => {
                if (err) throw err;
                console.log(`${answer.employee}'s role was updated!`);
                viewEmp();
            });
        });
    });
 };