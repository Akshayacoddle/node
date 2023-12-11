const mysql = require('mysql2');
const util = require('util');

const dbConFig = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "akshaya"
};
const con = mysql.createConnection(dbConFig);
function makeDb() {
    const connection = mysql.createConnection(dbConFig);
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}
con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to database');
})

module.exports = { makeDb, dbConFig };