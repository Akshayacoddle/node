// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
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
      || !academicYear) {
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

const questionPaper = async (req, res) => {
  try {
    const { exam } = req.body;
    if (!req.file) {
      return res.status(400).send({ message: 'only image files with 2mb or pdf file with 5mb are are allowed', success: false });
    }
    /* if (req.file === undefined || !exam) {
       return res.status(400).send({ message: 'missing required field', success: false });
     } */
    const result = await examModel.questionPaper({ exam });
    if (result.length > 0) {
      return res.status(404).send({ message: 'Already exist', success: false });
    }
    const newFileName = result.newName;
    const finalFileName = `${newFileName}${path.extname(req.file.originalname)}`;
    let newPath = path.join(req.file.destination, finalFileName);
    fs.rename(req.file.path, newPath, (err) => {
      if (err) {
        return res.status(500).send({ message: 'Error renaming file', success: false });
      }
      newPath = newPath.replace(/\\/g, '/');

      const result3 = examModel.paperInsert({ exam, newPath, finalFileName });
      res.status(200).send({
        success: true,
        message: 'successfully added',
        question_url: `http://localhost:8080/question/${finalFileName}`,
      });
    });
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error', success: false });
  }
};

module.exports = { sheduleExam, questionPaper };
