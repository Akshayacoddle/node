const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
router.use(jsonParser)

const examRoute = require('../controllers/exam')

router.post('/shedule', examRoute.sheduleExam)

module.exports = router;