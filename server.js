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

// prompting user for their choice
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

    // function to create employee
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


    // function to remove employees
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

    // function to view all employees
    function allEmployees() {
        connection.query("SELECT * FROM employee", (err, res) =>{
            if (err) 
            throw err;

            const table = cTable.getTable(res);

            console.log(table);
            promptUser();
        });
       
    }

    // search for employee by id
function employeeById() {
    inquirer.prompt([
        {
            type: 'input',
            message: "Which employee would you like to search for? (by id)",
            name: "empById"
        }
    ]).then( data => {
        connection.query("SELECT * FROM employee WHERE ?", {
            id: data.empById
        }, (err, res) => {
            if(err) {
                throw err;
                
            };
            console.log(res)
                const table = cTable.getTable(res);
                console.log(table)  
                console.log("Successfully search for employee by id!")
            promptUser();          
        })
        
    })
    
}


function addDep() {
    inquirer.prompt([
        {
            type:'input',
            message: "What department would you like to add?",
            name: "newDep"
        }
    ]).then( data => {
        connection.query("INSERT INTO department SET ?", {
            dep_name: data.newDep
        }, (err, res) => {
            if(err) {
                throw err;
            };
            console.log("Successfully created a new department!")
            promptUser();
        
        })
    })

}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: "What is the title of your new role?",
            name: "newRole"
        }, {
            type: 'input',
            message: "How much will the salary for this role be?",
            name: "inputSalary"
        }, {
            type: 'input',
            message: "What department will this role be apart of? (by id)",
            name: "byDep"
        }
    ]).then( data => {
        connection.query("INSERT INTO roles SET ?", {
            title: data.newRole,
            salary: data.inputSalary,
            dep_id: data.byDep
        }, (err, res) => {
            if(err) {
                throw err;
            };
            console.log("Successfully added a new role!")
            promptUser();
        })
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", (err, res) =>{
        if (err) 
        throw err;

        const table = cTable.getTable(res);

        console.log(table);
        promptUser();
    });
   
}

function viewDep() {
    connection.query("SELECT * FROM department", (err, res) =>{
        if (err) 
        throw err;

        const table = cTable.getTable(res);

        console.log(table);
        promptUser();
    });
   
}

module.exports = connection;




