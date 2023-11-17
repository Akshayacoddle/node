/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const teacherModel = require('../models/teacher');

const login = async (req, res) => {
  let result;
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: 'Missing required fields', success: false });
    }
    result = await teacherModel.login(email, password);
    if (result.length > 0) {
      const { id } = result[0];
      const jwtToken = jwt.sign({ id }, 'scretekeyStudent');
      res.status(200).send({ message: 'Login successful', jwtToken, success: true });
    }
  } catch (err) {
    res.status(401).send({ message: 'Invalid credentials', success: false });
  }
}
const viewTeachers = async (req, res) => {
  let result;
  try {
    const { page } = req.query;
    const { limit } = req.query;
    const startIndex = (page - 1) * limit;
    result = await teacherModel.view(startIndex, limit);
    res.status(200).send({ message: 'success', result, success: true });
  } catch (err) {
    res.status(500).send({ message: 'Failed to fetch from database', success: false });
  }
};
module.exports = { viewTeachers, login };
