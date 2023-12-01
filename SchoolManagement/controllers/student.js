/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const studentModel = require('../models/student');

const createData = async (req, res) => {
  try {
    const {
      rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber,
      nationality, caste, mobile, address, pinCode, passWord,
    } = req.body;
    if (!rollNumber || !firstName || !lastName || !dateOfBirth || !gender
      || !aadharNumber || !nationality || !caste || !mobile || !address || !pinCode || !passWord) {
      return res.status(400).send({ message: 'Missing required fields', success: false });
    }
    const result1 = await studentModel.checkAadhar(aadharNumber);
    if (result1.length > 0) {
      res.status(403).send({ message: 'Already exists', success: false });
    }
    await studentModel.createUser({
      rollNumber,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      aadharNumber,
      nationality,
      caste,
      mobile,
      address,
      pinCode,
      passWord,

    });
    res.status(200).send({ message: 'Data added successfully', success: true });
  } catch (err) {
    res.status(500).send({ message: 'Failed to insert into the database', success: false });
  }
};

const login = async (req, res) => {
  let result;
  try {
    const { rollNumber, aadharNumber } = req.body;
    if (!rollNumber || !aadharNumber) {
      return res.status(400).send({ message: 'Missing required fields', success: false });
    }
    result = await studentModel.studentLogin(rollNumber, aadharNumber);
    if (result.length > 0) {
      /*const { id } = result[0];
      const jwtToken = jwt.sign({ id }, 'scretekeyStudent');*/
      res.status(200).send({ message: 'Login successful', /*jwtToken,*/ success: true });
    }
    res.status(401).send({ message: 'Invalid credentials', success: false });
  } catch (err) {
    res.status(401).send({ message: 'Invalid credentials', success: false });
  }
};
const viewStudent = async (req, res) => {
  let result;
  try {
    const { page } = req.query;
    const { limit } = req.query;
    const startIndex = (page - 1) * limit;
    result = await studentModel.view(startIndex, limit);
    res.status(200).send({ message: 'success', result, success: true });
  } catch (err) {
    res.status(500).send({ message: 'Failed to fetch database', success: false });
  }
};

const studentReview = async (req, res) => {
  try {
    const {
      rollNumber, classId, teacher, subject,
      aboutTeacher, aboutSchool, thingsToImprove,
    } = req.query;
    if (!rollNumber || !classId || !teacher || !subject
      || !aboutTeacher || !aboutSchool || !thingsToImprove) {
      return res.status(400).send({ message: 'Missing required fields', success: false });
    }
    const result = await studentModel.review({
      rollNumber,
      classId,
      teacher,
      subject,
      aboutTeacher,
      aboutSchool,
      thingsToImprove,
    });
    res.status(200).send({ message: 'success', result, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Failed to fetch database', success: false });
  }
};
module.exports = {
  createData, login, viewStudent, studentReview,
};
