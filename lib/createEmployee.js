const inquirer = require("inquirer");
const {promptUser, connection} = require("../server");

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
            message: "What will their role be?",
            name: "employeeRole"
        }, {
            type: "input",
            message: "Who will be their manager?",
            name: "employeesManager"
        }
    ]).then( data => {
        console.log(data)
        

        connection.query("INSERT INTO employee VALUES ?", {
            first_name: data.employeeName,
            last_name: employeeLast,
            role_id: employeeRole,
            manager_id: employeesManager
        }, (err, data) => {
            if (err) {
                throw err;
            };
            return data;
        }).then( response => {
            console.log(response);
        }).catch((err) => {
            throw err;
        }) 
        promptUser();
    }).catch((err) => {
        throw err;
    });
}; 


module.exports = createEmployee;