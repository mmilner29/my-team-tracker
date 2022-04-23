const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');


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
            'update an employee role'
        ]
    }
]

inquirer
    .prompt(options)
    .then((answers) => {
        console.log(answers.options);
        if (answers.options === 'view all roles') {
            console.log('view');

        } else if (answers.options === 'view all departments') {
            console.log('view dep');

        } else if (answers.options === 'view all employees') {
            console.log('view emp');

        } else if (answers.options === 'add a department') {
            console.log('add dep');

        } else if (answers.options === 'add a role') {
            console.log('add role');

        } else if (answers.options === 'add an employee') {
            console.log('add emp');

        } else if (answers.options === 'update an employee role') {
            console.log('update emp');
            
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

 //function for viewing all departments

 //function for viewing all roles

 //function for viewing all employees

 //function for adding a department

 //function for adding a role

 //function for adding an employee

 //function for updating an employee