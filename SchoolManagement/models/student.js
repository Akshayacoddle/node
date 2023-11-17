const con = require('../config/connection');

const checkAadhar = async (aadharNumber) => {
  const db = con.makeDb();
  try {
    const qr = `select * from student where aadhar_number =${aadharNumber}`;
    const result = await db.query(qr);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};
const createUser = async ({
  rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber,
  nationality, caste, mobile, address, pinCode, passWord
}) => {
  const db = con.makeDb();
  try {
    const qr = 'INSERT  INTO student (roll_number, first_name, last_name, date_of_birth, gender, aadhar_number, nationality, caste, mobile, address, pin_code,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const result = await db.query(qr, [rollNumber, firstName, lastName, dateOfBirth,
      gender, aadharNumber, nationality, caste, mobile, address, pinCode, passWord]);
    return result;
  }
  catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};
const studentLogin = async (rollNumber, aadharNumber) => {
  const db = con.makeDb();
  try {
    const qr = 'SELECT * FROM student WHERE roll_number = ? AND aadhar_number = ?';
    const result = await db.query(qr, [rollNumber, aadharNumber]);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};
const view = async (startIndex, endIndex) => {
  const db = con.makeDb();
  let result;
  try {
    const qr = await `SELECT * FROM student limit ${startIndex} , ${endIndex}`;
    result = db.query(qr);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};

module.exports = {
  createUser, studentLogin, view, checkAadhar,
};
