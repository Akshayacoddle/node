// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');
const path = require('path');
const examModel = require('../models/exam');
// eslint-disable-next-line consistent-return
const sheduleExam = async (req, res) => {
  try {
    const {
      name, classId, startDate, endDate, subjectId, roomNumber,
      academicYear, examTypeId, questionPaperId,
    } = req.body;
    if (!name || !classId || !startDate || !endDate || !subjectId || !roomNumber
      || !academicYear || !questionPaperId) {
      return res.status(400).send({ message: 'missing required field', success: false });
    }
    const result2 = await examModel.sheduleinsert({
      name,
      classId,
      startDate,
      endDate,
      subjectId,
      roomNumber,
      academicYear,
      examTypeId,
      questionPaperId,
    });
    if (result2.length > 0) {
      return res.status(404).send({ message: 'confilt in either class or room', success: false });
    }
    return res.status(404).send({ message: 'data added successful', success: true });
  } catch (err) {
    res.status(500).send({ message: 'Failed to insert into the database', success: false });
  }
};
const stroage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => cb(null, `${file.originalname}${path.extname(file.originalname)}`),
});
const questionPaper = async (req, res) => {
  try {
    const { name, type, path } = req.body;
    // eslint-disable-next-line no-unused-vars
    const result2 = await examModel.questionPaper({
      name,
      type,
      path,
    });
    res.send({
      success: 1,
      question_url: `http://localhost:5001/question/${req.file.filename}`,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sheduleExam, questionPaper, stroage };
