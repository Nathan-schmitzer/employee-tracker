const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "1July2018",
    database: "employee_tracker_db"
});

connection.connect(err => {
    if (err) {
        throw err;
    }
    promptUser();
    console.log("Connecting on local host 3306");
});

function promptUser() {
    inquirer.prompt([
   {
       type: 'list',
       message: 'What would you like to do?',
       name: "options",
       choices: ["View all employees",
   "View all employees by department",
   "View all employees by manager",
   "View all departments",
   "View all roles",
   "Add employee",
   "Add department",
   "Add new roles",
   "Remove employee",
   "View employee by id",
   "Update employee role",
   "Update employee manager",
    "EXIT"]
   }
   ]).then( function (answer) {
       switch (answer.options) {
            case 'View all employees':
                allEmployees();
            break;
            
            case 'View all employees by department':
                employeeByDep();
            break;

            case  "View all employees by manager":
                viewByManager();
            break;

            case "View all departments":
                viewDep();
            break;

            case "View all roles":
                viewRoles();
            break;

            case 'Add employee':
                createEmployee();
            break;

            case "Add department":
                addDep();
            break;

            case "Add new roles":
                addRole();
            break;

            case 'Remove employee':
                removeEmp();
            break;

            case 'View employee by id':
                employeeById();
            break;

            case 'Update employee role':
                updateEmp();
            break;

            case 'Update employee manager':
                updateManager();
            break;

            case 'EXIT':
                default: console.log("Thank you fur using this app")
                connection.end();
                
        }
   })
    };

    function createEmployee () {
        inquirer.prompt([
            {
                type: 'input',
                message: "What is the name of your employee?",
                name: "employeeName"
            }, {
                type: 'input',
                message: 'What is the last name of your employee?',
                name: "employeeLast"
            }, {
                type: 'input',
                message: "What will their role id be?",
                name: "employeeRole"
            }, {
                type: "input",
                message: "Who will be their manager?",
                name: "employeesManager"
            }
        ]).then( data => {
            console.log(data)
            
    
            connection.query("INSERT INTO employee SET ?", {
                first_name: data.employeeName,
                last_name: data.employeeLast,
                role_id: data.employeeRole,
                manager_id: data.employeesManager
            }, (err, res) => {
                if (err) {
                    throw err;
                }; 
                console.log("Sucessfully transferred new employee");
                promptUser();
            });
        });
    }; 

    function removeEmp() {
        inquirer.prompt([
            {
                type:'input',
                message: "Which employee would you like to remove?",
                name: "employeeRemove"
            }
        ]).then( data => {
            connection.query("DELETE FROM employee WHERE ?", {
                id: data.employeeRemove
            }, (err, res) => {
                if (err) {
                    throw err;
                }; 
                console.log("Sucessfully removed employee");
                promptUser();
            });
        });
    };

    function allEmployees() {
        connection.query("SELECT * FROM employee", (err, res) =>{
            if (err) 
            throw err;

            const table = cTable.getTable(res);

            console.log(table);
            promptUser();
        });
       
    }

module.exports = connection;




