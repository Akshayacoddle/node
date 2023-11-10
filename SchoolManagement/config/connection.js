const mysql = require('mysql2');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "akshaya"
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database');
})

module.exports = con;