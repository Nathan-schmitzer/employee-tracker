const cTable = require("console.table");
const connection = require("../server")
const inquirer = require("inquirer");

function viewRoles() {
    const query =  "SELECT * FROM roles";

    connection.query(query, (err, res) => {
        if (err) throw err;

        const table = cTable.getTable(res);

        console.log(table);
        
        inquireConnection.prompts();
    });
}