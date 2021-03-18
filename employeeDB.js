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
                'View All Employees By Role',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
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
            } else if (answers.menu === 'View All Employees By Role') {
                viewEmployeesRole();
            }
            else {
                return;
            }
        })
};

function viewEmployees() {
    connection.query(`SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.department_name, CONCAT(manager.first_name, ' ' ,manager.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN department on department.id = roles.department_id LEFT JOIN employees manager on employees.manager_id = manager.id;`, (err, res) => {
        if (err) throw err;
        console.log('/n');
        console.log('EMPLOYEES')
        console.table(res);
    })
    init();
};

function viewEmployeesDepartment() {
    connection.query(`SELECT employees.first_name, employees.last_name, department.department_name FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN department on department.id = roles.department_id;`, (err, res) => {
        if (err) throw err;
        console.log('/n');
        console.log('EMPLOYEES')
        console.table(res);
        console.log('/n');
    })
    init();
}

function viewEmployeesRole() {
    connection.query(`SELECT employees.first_name, employees.last_name, roles.title FROM employees INNER JOIN roles on roles.id = employees.role_id;`, (err, res) => {
        if (err) throw err;
        console.log('/n');
        console.log('EMPLOYEES')
        console.table(res);
        console.log('/n');
    })
    init();
}

function viewEmployeesManager() {
    connection.query(`SELECT employees.first_name, employees.last_name, CONCAT(manager.first_name, ' ' ,manager.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.role_id INNER JOIN department on department.id = roles.department_id LEFT JOIN employees manager on employees.manager_id = manager.id;`, (err, res) => {
        if (err) throw err;
        console.log('/n');
        console.log('EMPLOYEES')
        console.table(res);
    })
    init();
}

function addEmployee() {
    const addE = [
        {
            type: 'input',
            message: 'What is the first name of your employee?',
            name: 'firstName'
        },
        {
            type: 'input',
            message: 'What is the last name of your employee?',
            name: 'lastName'
        },
        {
            type: 'list',
            message: 'What is their role?',
            name: 'role',
            choices: [
                '1 - Sales Lead',
                '2 - Salesperson',
                '3 - Lead Engineer',
                '4 - Software Engineer',
                '5 - Account Manager',
                '6 - Legal Lead',
                '7 - Lawyer',
            ]
        },
        {
            type: 'list',
            message: 'Who is their manager?',
            name: 'managerName',
            choices: [
                'No one',
                '1 - Billy Baggins',
                '3 - Brandon Carter',
                '5 - Biggie Smalls',
                '6 - Mary Sue',
            ]
        }
    ]
    inquirer.prompt(addE)
        .then((data) => {
            if (data.managerName === 'No one') {
                const query = connection.query(
                    'INSERT INTO employees SET ?',
                    {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        role_id: parseInt(data.role),
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log('Employee Added!')
                        init();
                    }
                )
            } else {
                const query = connection.query(
                    'INSERT INTO employees SET ?',
                    {
                        first_name: data.firstName,
                        last_name: data.lastName,
                        role_id: parseInt(data.role),
                        manager_id: parseInt(data.managerName)
                    },
                    (err, res) => {
                        if (err) throw err;
                        console.log('Employee Added!')
                        init();
                    }
                )
            }
        })
};

function removeEmployee() {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        const removeE = [
            {
                type: 'list',
                message: 'Who would you like to remove?',
                name: 'removal',
                choices: res.map(item => item.first_name)
            }
        ]
        inquirer.prompt(removeE)
            .then((data) => {
                connection.query(`DELETE FROM employees WHERE ?`, {
                    first_name: data.removal
                },
                    (err, res) => {
                        console.log('Sorry to see them go');
                        init();
                    }
                )
            })
    })
};

function updateEmployeeRole() {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err;
        const updateE = [
            {
                type: 'list',
                message: 'Who would you like to update?',
                name: 'name',
                choices: res.map(item => item.first_name)
            },
            {
                type: 'list',
                message: 'please select their new role',
                name: 'update',
                choices: [
                    '1 - Sales Lead',
                    '2 - Salesperson',
                    '3 - Lead Engineer',
                    '4 - Software Engineer',
                    '5 - Account Manager',
                    '6 - Legal Lead',
                    '7 - Lawyer',
                ]
            },
            {
                type: 'list',
                message: 'Who is their manager?',
                name: 'manager',
                choices: [
                    'No one',
                    '1 - Billy Baggins',
                    '3 - Brandon Carter',
                    '5 - Biggie Smalls',
                    '6 - Mary Sue',
                ]
            },
        ]
        inquirer.prompt(updateE)
            .then((data) => {
                if (data.manager === 'No one') {
                    connection.query('UPDATE employees SET ? WHERE ?',
                        [
                            {
                                role_id: parseInt(data.update),
                            },
                            {
                                first_name: data.name,
                            }

                        ],
                        (error) => {
                            if (error) throw err;
                            console.log('Employee Updated');
                            init();
                        }
                    )
                } else {
                    connection.query('UPDATE employees SET ? WHERE ?',
                        [
                            {
                                role_id: parseInt(data.update),
                                manager_id: parseInt(data.manager),
                            },
                            {
                                first_name: data.name,
                            }

                        ],
                        (error) => {
                            if (error) throw err;
                            console.log('Employee Updated');
                            init();
                        }
                    )
                }
            })
    })
}

init();





