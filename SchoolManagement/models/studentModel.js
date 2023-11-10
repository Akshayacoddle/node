// studentModel.js
const con = require("../config/connection");

const createUser = (rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode, callback) => {
    const qr = `INSERT INTO student (roll_number, first_name, last_name, date_of_birth, gender, aadhar_number, nationality, caste, mobile, address, pin_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    con.query(qr, [rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode], (err, result) => {
        if (err) {

            callback(err);
        } else {
            callback(null, result);
        }
    });
};
const studentLogin = (rollNumber, aadharNumber, callback) => {
    const qr = `SELECT * FROM student WHERE roll_number = ? AND aadhar_number = ?`;
    con.query(qr, [rollNumber, aadharNumber], (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
};
const view = (startIndex, endIndex, callback) => {

    const qr = `SELECT * FROM student limit ${startIndex} , ${endIndex}`;

    con.query(qr, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
};
const update = (id, address, callback) => {
    const qr = `update student set first_name = ? where id= ?`;

    con.query(qr, [id, address], (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
};
const viewOne = (id, callback) => {
    const qr = `select * from student where id = ${id}`
    con.query(qr, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
module.exports = { createUser, studentLogin, view, update, viewOne };
