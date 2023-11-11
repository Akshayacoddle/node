const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const teacherController = require('../controllers/teacher')
const jsonParser = bodyParser.json();
router.use(jsonParser)

router.get('/view', teacherController.viewTeachers)
module.exports = router;