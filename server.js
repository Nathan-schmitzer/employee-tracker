const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")

const connection = mysql.connection.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "employee_tracker_db"
});

connection.connect(err => {
    if (err) {
        throw err;
    }
    promptUser();
});



