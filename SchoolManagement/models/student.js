const con = require("../config/connection");


const createUser = async (rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode, passWord) => {
    const db = con.makeDb();
    let result
    try {
        const qr = `INSERT INTO student (roll_number, first_name, last_name, date_of_birth, gender, aadhar_number, nationality, caste, mobile, address, pin_code,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        result = await db.promise().query(qr, [rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode, passWord])
        return result;
    }
    catch (err) {
        throw err
    }
    finally {
        await db.close();
    }
};
const studentLogin = async (rollNumber, aadharNumber) => {
    const db = con.makeDb();
    let result
    try {
        const qr = await `SELECT * FROM student WHERE roll_number = ? AND aadhar_number = ?`;
        result = db.query(qr, [rollNumber, aadharNumber])
        return result
    } catch (err) {
        throw err;
    }
    finally {
        await db.close();
    }

};

const view = async (startIndex, endIndex) => {
    const db = con.makeDb();
    let result
    try {
        const qr = await `SELECT * FROM student limit ${startIndex} , ${endIndex}`;
        result = db.query(qr)
        console.log();
        return result
    }
    catch (err) {
        console.log(err);
        throw err
    }
    finally {
        await db.close();
    }
};
const update = async (id, address) => {
    const db = con.makeDb();
    let result;
    try {
        const qr = await `update student set first_name = ? where id= ?`;
        result = con.promise().query(qr, [id, address])
        return result;
    } catch (err) {
        throw err
    }
    finally {
        await db.close();
    }
}
const viewOne = async (id) => {
    const db = con.makeDb();
    let result;
    try {
        const qr = await `select * from student where id = ${id}`
        result = con.promise().query(qr)
        return result
    } catch (err) {
        throw err
    }
    finally {
        await db.close();
    }
}
module.exports = { createUser, studentLogin, view, update, viewOne };
