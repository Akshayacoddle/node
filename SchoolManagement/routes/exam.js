const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('../middleWare/verifyToken');
router.use(jsonParser)

const examRoute = require('../controllers/exam')

router.post('/shedule', jwt.verifyJwt, examRoute.sheduleExam)

module.exports = router;