const express = require('express');

const multer = require('../middleWare/multer');
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const jwt = require('../middleWare/verifyToken');

router.use(jsonParser);

const examRoute = require('../controllers/exam');

router.post('/shedule', jwt.verifyJwt, examRoute.sheduleExam);
router.post('/questions', jwt.verifyJwt, multer.upload.single('question'), examRoute.questionPaper);
router.post('/hallTicket', jwt.verifyJwt, examRoute.hallTicket);
//router.get('/hallTicketView', jwt.verifyJwt, examRoute.hallTicketView);
module.exports = router;
