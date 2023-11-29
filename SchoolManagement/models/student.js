/* eslint-disable consistent-return */
const con = require('../config/connection');

const checkAadhar = async (aadharNumber) => {
  const db = con.makeDb();
  try {
    const checkAadharQuery = `select * from student where aadhar_number =${aadharNumber}`;
    const checkAadharResult = await db.query(checkAadharQuery);
    return checkAadharResult;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};
const createUser = async ({
  rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber,
  nationality, caste, mobile, address, pinCode, passWord,
}) => {
  const db = con.makeDb();
  try {
    const createStudentquery = 'INSERT  INTO student (roll_number, first_name, last_name, date_of_birth, gender, aadhar_number, nationality, caste, mobile, address, pin_code,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const createStudentResult = await db.query(createStudentquery, [rollNumber, firstName, lastName,
      dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode, passWord]);
    return createStudentResult;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};
const studentLogin = async (rollNumber, aadharNumber) => {
  const db = con.makeDb();
  try {
    const studentLoginQuery = 'SELECT * FROM student WHERE roll_number = ? AND aadhar_number = ?';
    const studentLoginResult = await db.query(studentLoginQuery, [rollNumber, aadharNumber]);
    return studentLoginResult;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};
const view = async (startIndex, endIndex) => {
  const db = con.makeDb();
  try {
    const viewQuery = await `SELECT * FROM student limit ${startIndex} , ${endIndex}`;
    const viewResult = db.query(viewQuery);
    return viewResult;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};

module.exports = {
  createUser, studentLogin, view, checkAadhar,
};
