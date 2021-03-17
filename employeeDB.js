const inquirer = require('inquirer');
const mysql = require('mysql');
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: '',
    database: 'employee_DB',
});

const init = () => {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: [
                'View All Employees',
                'View All Employees By Department',
                'View All Employees By Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'EXIT'
            ],
        })
        .then((answers) => {
            if (answers.menu === 'View All Employees') {
                viewEmployees();
            } else if (answers.menu === 'View All Employees By Department') {
                viewEmployeesDepartment();
            } else if (answers.menu === 'View All Employees By Manager') {
                viewEmployeesManager();
            } else if (answers.menu === 'Add Employee') {
                addEmployee();
            } else if (answers.menu === 'Remove Employee') {
                removeEmployee();
            } else if (answers.menu === 'Update Employee Role') {
                updateEmployeeRole();
            } else if(answers.menu === 'Update Employee Manager') {
                updateEmployeeManager();
            } else {
                return;
            }
        })
};

function viewEmployees() {
    connection.query(`SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN department on department.id = roles.department_id LEFT JOIN employees e on employees.manager_id = e.id;`, (err, res) => {
        if (err) throw err;
        console.log('/n');
        console.log('EMPLOYEES')
        console.table(res);
    })
    // connection.query(`SELECT roles.id, roles.title, roles.salary FROM roles`, (err, res) => {
    // if (err) throw err;
    // console.log('Their info');
    // console.table(res);
    // })
    // connection.query(`SELECT department.id, department.name FROM department`, (err, res) => {
    //     if (err) throw err;
    //     console.log('Their department');
    //     console.table(res);
    //     })
    init();
};

function viewEmployeesDepartment() {

}


init();





