const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const teacherController = require('../controllers/teacher')
const jwt = require('../middleWare/verifyToken');
const jsonParser = bodyParser.json();
router.use(jsonParser)

router.post('/login', teacherController.login)
router.get('/view', jwt.verifyJwt, teacherController.viewTeachers)
module.exports = router;