const express = require('express');

const multer = require('../middleWare/multer');

const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const jwt = require('../middleWare/verifyToken');

router.use(jsonParser);

const examRoute = require('../controllers/exam');

router.post('/shedule', jwt.verifyJwt, jwt.restricted('admin'), examRoute.sheduleExam);
router.post('/questions', jwt.verifyJwt, jwt.restricted('admin'), multer.upload.single('question'), examRoute.questionPaper);
router.post('/hallTicket', jwt.verifyJwt, jwt.restricted('admin'), examRoute.hallTicket);
router.get('/hallTicketView', jwt.verifyJwt, jwt.restricted('user'), examRoute.hallTicketView);
module.exports = router;
