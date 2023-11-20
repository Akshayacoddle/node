const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    return res.status(400).send({ message: 'token is not generated', success: false });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, 'scretekeyStudent', (err) => {
    if (err) {
      res.status(401).send({ message: 'Not Authenticate', success: false });
    } else {
      next();
    }
  });
};

module.exports = {
  verifyJwt,
};
