const inquirer = require('inquirer')
const sql = require('mysql2')
require('dotenv').config()
const cTable = require('console.table');
const connection = require('./db/connection.js');

function init() {
    console.log(
        "Employee Manager Initialized"
    )
    promptChoices()
}
//======================================
// VIEW CONSTANTS
//======================================
const viewDepartments = async () => {
    try {
        const [results] = await connection.promise().query(
            'SELECT * FROM department')
        console.table(results)
        promptChoices()
    } catch (err) {
        throw new Error(err)
    }
}


const viewRoles = async () => {
    try {
        const [results] = await connection.promise().query(
            'SELECT * FROM role')
        console.table(results)
        promptChoices()
    } catch (err) {
        throw new Error(err)
    }
}

const viewEmployees = async () => {
    try {
        const [results] = await connection.promise().query(
            'SELECT * FROM employee')
        console.table(results)
        promptChoices()
    } catch (err) {
        throw new Error(err)
    }
}

const addDepartment = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the new department?'
        }
    ])
    try {
        const [results] = await connection.promise().query(
            'INSERT INTO department (name) VALUES (?)',
            answers.name)

        console.table('Department has been added!')
        promptChoices()
    } catch (err) {
        throw new Error(err)
    }
}

const addRole = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the new role title:'
        }, {
            type: 'number',
            name: 'salary',
            message: 'Input their salary (ex: 10000): '
        }, {
            type: 'number',
            name: 'department_id',
            message: 'Enter the ID number:'
        }
    ])

    try {
        const [results] = await connection.promise().query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [answers.name, answers.salary, answers.department_id])

        console.log('ROLE has been ADDED to database!')
        promptChoices()
    } catch (err) {
        throw new Error(err)
    }
}
//add Employee const
const addEmployee = async () => {

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'First Name:'
        }, {
            type: 'input',
            name: 'last_name',
            message: 'Last Name:'
        }, {
            type: 'number',
            name: 'role_id',
            message: 'Enter Department ID #:'
        }, {
            type: 'number',
            name: 'manager_id',
            message: 'Enter Manager ID #:'
        }
    ])

    try {
        console.log(answers)
        const [results] = await connection.promise().query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
            [answers.first_name, answers.last_name, answers.role_id, answers.manager_id])
        
            console.log('EMPLOYEE has been ADDED!')
        promptChoices()
    } catch (err) {
        throw new Error(err)
    }
}
//updateEmployee
const updateEmployee = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter EMPLOYEE ID #:'
        }, {
            type: 'number',
            name: 'role_id',
            message: 'Enter new EMPOLOYEE ROLE ID#: '
        }
    ])

    try {
        const [results] = await connection.promise().query(
            'UPDATE employee SET role_id = ? WHERE id = ?', 
            [(answers.role_id), (answers.id)])
        
            console.log('EMPLOYEE has been UDPATED')
        promptChoices()
    } catch (err) {
        throw new Error(err)
    }
}
//establish the 
const promptChoices = async () => {
    const answers = await inquirer.prompt([{
        type: 'list',
        name: 'choices',
        message: 'Choose an action',
        choices: [
            'VIEW all Departments',
            'VIEW all Roles',
             'VIEW all Employees',
              'ADD a Department',
               "ADD a Role",
                'ADD an Employee',
                 'UPDATE Employees',
                  'EXIT']
    }
    ])

    if (answers.choices === 'VIEW all Departments') {
        viewDepartments()
    } else if (answers.choices === 'VIEW all Roles') {
        viewRoles()
    } else if (answers.choices === 'VIEW all Employees') {
        viewEmployees()
    } else if (answers.choices === 'ADD a Department') {
        addDepartment()
    } else if (answers.choices === 'ADD a Role') {
        addRole()
    } else if (answers.choices === 'ADD an Employee') {
        addEmployee()
    } else if (answers.choices === 'UPDATE Employees') {
        updateEmployee()
    } else if (answers.choices === 'EXIT') {
        return
    }
}

init()