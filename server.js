const inquirer = require('inquirer');
const mysql = require('mysql2');
const express = require('express');

const PORT = process.envPORT || 3001;
const app = express()

app.use(express.urlencoded({encoded: false}));
app.use(express.json());

const db = mysql.createConnection(
  {
    host:'localhost',
    user: 'root',
    password: 'PooPerS954!1Ch4RmF',
    database: 'work_structure_db'
  },
  console.log(`Connected to the work_structure_db database.`)
);

// inquirer prompt for terminal to gather data on the usage of the 
inquirer.prompt([
  {
    type: 'list',
    name: 'index',
    message: 'Where would you like to navigate to?',
    choices: 
    [
      '(Department) View All',
      '(Department) Add New',
      '(Employee) View All',
      '(Employee) Add New',
      '(Employee) Update Role',
      '(Role) View All',
      '(Role) Add New'
    ],
  }
])
.then((answers) => {
  switch(answers.index) {
    case '(Department) View All':
      console.log('You chose (Department) View All');
      db.query('SELECT * FROM department', function (err,results){
        console.log(results);
      });
      break;
    

    case '(Department) Add New':
      console.log('You chose (Department) Add New');
      break;


    case '(Employee) View All':
      console.log('You chose (Employee) View All');
      db.query('SELECT * FROM employee', function (err,results){
      console.log(results);
      });
      break;


    case '(Employee) Add New':
      console.log('You chose (Employee) Add New');
      break;


    case '(Employee) Update Role':
      console.log('You chose (Employee) Update Role');
      break;


    case '(Role) View All':
      console.log('You chose (Role) View All');
      db.query('SELECT * FROM role', function (err,results){
        console.log(results);
      });
      break;


    case '(Role) Add New':
      console.log('You chose (Role) Add New');
      break;


    default:
      console.group('Invalid Choice')
  }
}).catch((error) => {
  console.log('Error Occured', error)
});




//  Focusing in just the department table
// viewing all from department table 
// db.query('INSERT INTO department(name) VALUES ()', function (err,results){
//   console.log(results);
// });
/////////////////////////////////////


// Focuing on employee table 
// viewing all from employee table
// Adding new employee
// db.query('INSERT INTO employee(first_name,last_name) VALUES()()', function (err,results){
//   console.log(results);
// });
// Updating role into database
// db.query('INSERT INTO employee(first_name,last_name) VALUES()()', function (err,results){
//   console.log(results);
// });
/////////////////////////////////////

// Focusing on the role table 
// viewing all from role table

// Adding a new role
// db.query('INSERT INTO role(title, salary) VALUE', function (err,results){
//   console.log(results);
// });
/////////////////////////////////////








app.use((req,res) => {
  res.status(404).end()
});

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});