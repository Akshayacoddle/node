const express = require('express');

const multer = require('multer');

const stroage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => cb(null, `${file.originalname}`),
});

const upload = multer({
  storage: stroage,
});
const router = express.Router();
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const jwt = require('../middleWare/verifyToken');

router.use(jsonParser);

const examRoute = require('../controllers/exam');

router.post('/shedule', jwt.verifyJwt, examRoute.sheduleExam);
router.post('/question', jwt.verifyJwt, upload.single('question'), examRoute.questionPaper);
router.use('/question', express.static('upload/images'));

module.exports = router;
