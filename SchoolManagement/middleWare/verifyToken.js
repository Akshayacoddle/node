const jwt = require('jsonwebtoken');
const util = require('util');
const adminModel = require('../models/teacher');
const userModel = require('../models/student');

let decodedToken;
const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    return res.status(400).send({ message: 'token is not generated', success: false });
  }
  const token = authHeader.split(' ')[1];
  decodedToken = jwt.verify(token, process.env.SECRET_STR || 'scretekeyStudent');

  jwt.verify(token, 'scretekeyStudent', (err) => {
    if (err) {
      res.status(401).send({ message: 'Not Authenticate', success: false });
    } else {
      next();
    }
  });
};
const restricted = (role) => async (req, res, next) => {
  if (role === 'admin') {
    const admin = await adminModel.authentication(decodedToken.id, role);
    if (admin.length > 0) {
      next();
    } else {
      res.status(401).send({ message: "You don't have permission to perform this operation", success: false });
    }
  } else if (role === 'user') {
    const user = await userModel.authentication(decodedToken.id, role);
    if (user.length > 0) {
      next();
    } else {
      res.status(401).send({ message: "You don't have permission to perform this operation", success: false });
    }
  }
};
module.exports = {
  verifyJwt, restricted,
};
