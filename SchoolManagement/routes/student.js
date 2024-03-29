const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('../middleWare/verifyToken');
const signController = require('../controllers/student');

const jsonParser = bodyParser.json();
router.use(jsonParser);

router.post('/register', signController.createData);
router.post('/login', signController.login);
router.get('/view', jwt.verifyJwt, jwt.restricted('admin'), signController.viewStudent);
router.post('/feedback', signController.studentReview);

module.exports = router;
