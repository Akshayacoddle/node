const con = require("../config/connection");
const createUser = async (rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode, passWord) => {
    let result
    try {
        const qr = `INSERT INTO student (roll_number, first_name, last_name, date_of_birth, gender, aadhar_number, nationality, caste, mobile, address, pin_code,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        result = await con.promise().query(qr, [rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode, passWord])
        return result;
    }
    catch (err) {
        throw err
    }
};
const studentLogin = async (rollNumber, aadharNumber) => {
    let result
    try {
        const qr = await `SELECT * FROM student WHERE roll_number = ? AND aadhar_number = ?`;
        result = con.promise().query(qr, [rollNumber, aadharNumber])
        return result
    } catch (err) {
        throw err;
    }

};
const view = async (startIndex, endIndex) => {
    let result
    try {
        const qr = await `SELECT * FROM student limit ${startIndex} , ${endIndex}`;
        result = con.promise().query(qr)
        return result
    }
    catch (err) {
        throw err
    }
};
const update = async (id, address) => {
    let result;
    try {
        const qr = await `update student set first_name = ? where id= ?`;
        result = con.promise().query(qr, [id, address])
        return result;
    } catch (err) {
        throw err
    }
}
const viewOne = async (id) => {
    let result;
    try {
        const qr = await `select * from student where id = ${id}`
        result = con.promise().query(qr)
        return result
    } catch (err) {
        throw err
    }
}
module.exports = { createUser, studentLogin, view, update, viewOne };
