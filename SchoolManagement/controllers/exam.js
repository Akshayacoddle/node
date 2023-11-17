const examModel = require('../models/exam');

// eslint-disable-next-line consistent-return
const sheduleExam = async (req, res) => {
  try {
    const {
      name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId,
    } = req.body;
    if (!name || !classId || !startDate || !endDate || !subjectId || !roomNumber || !academicYear) {
      return res.status(400).send({ message: 'missing required field', success: false });
    }
    const result2 = await examModel.sheduleinsert(
      name,
      classId,
      startDate,
      endDate,
      subjectId,
      roomNumber,
      academicYear,
      examTypeId,
    );

    if (result2.length > 0) {
      return res.status(404).send({ message: 'confilt in either class or room', success: false });
    }
    return res.status(404).send({ message: 'data added successful', success: true });
  } catch (err) {
    res.status(500).send({ message: 'Failed to insert into the database', success: false });
  }
};

module.exports = { sheduleExam };
