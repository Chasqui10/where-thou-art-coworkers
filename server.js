const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.envPORT || 3001;
const app = express()

app.use(express.urlencoded({encoded: false}));
app.use(express.json());

const database = 'work_structure_db';

const db = mysql.createConnection(
  {
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'work_structure_db'
  },
  console.log(`Connected to the work_structure_db database.`)
);

function init() {
  const questions = [
    {
      type: 'list',
      name: 'index',
      message: 'Where would you like to navigate to?',
      choices: [
        '(Department) View All',
        '(Department) Add New',
        '(Employee) View All',
        '(Employee) Add New',
        '(Employee) Update Role',
        '(Role) View All',
        '(Role) Add New'
      ]
    }
  ];

  inquirer.prompt(questions).then((answers) => {

    if (answers.index === '(Department) View All') {
      db.query(`SELECT * FROM department`, function (err,results){
        console.log(results);
       init();
      })
    };
    
    if (answers.index === '(Department) Add New') {
      inquirer.prompt({
        type: 'input',
        name: 'new_dept',
        message: 'What is the name of the new department you would like to add?'
      }).then((answers) => {
        db.query(`INSERT INTO department(name) VALUES ('${answers.new_dept}')`, post, function ( err, results){
          console.log(results);
          init();
        });
      });
    };

    if (answers.index === '(Employee) View All') {
      db.query(`SELECT * FROM employee`, function (err,results){
        console.log(results);
        init();
      });
    };

    if (answers.index === '(Employee) Add New') {
      inquirer.prompt([
        {
          type: 'input',
          name: 'new_EM_first_name',
          message: 'What is the first name of the new employee you would like to add?'
        },
        {
          type: 'input',
          name: 'new_EM_last_name',
          message: 'What is the last name of the new employee you would like to add?'
        }
      ]).then((answers) => {
        db.query(`INSERT INTO employee(first_name,last_name) VALUES ('${answers.new_EM_first_name}','${answers.new_EM_last_name}')`, function ( err, results){
          console.log(results);
          init();
        });
      });
    }

    if (answers.index === '(Employee) Update Role') {
    inquirer.prompt([
      {
        type: 'input',
        name: 'select_employee_id',
        message: "What is the your employee's id, you would like to update their role?"
      }, 
      {
        type: 'input',
        name: 'select_role_id',
        message: "What is the role's id you would like to assign to the employee?"
      }, 
      ]).then((answers) => {
        db.query(`UPDATE employee SET role_id = '${answers.select_role_id}' WHERE id = '${answers.select_employee_id}'`, function ( err, results){
          console.log(results);
          init();
        });
      });
    };

    if (answers.index === '(Role) View All') {
      db.query(`SELECT * FROM role`, function (err,results){
        console.log(results);
        init();
      });
    }

    if (answers.index === '(Role) Add New') {
      inquirer.prompt([
        {
          type: 'input',
          name: 'new_role',
          message: 'What is the name of the new role you would like to add?'
        },
        {
          type: 'input',
          name: 'new_salary',
          message: 'What is the salary of the new role you would like to add?'
        }
      ]).then((answers) => {
        db.query(`INSERT INTO role(title, salary) VALUES ('${answers.new_role}','${answers.new_salary}')`, function ( err, results){
          console.log(results);
          init();
        });
      });
    }
  })
  .catch((error) => {
    console.log('Error Occured', error)
  });
};

init();

app.use((req,res) => {
  res.status(404).end()
});

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});