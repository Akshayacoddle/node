const examModel = require('../models/exam');

const sheduleExam = async (req, res) => {
    try {
        const { name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId } = req.body;
        if (!name || !classId || !startDate || !endDate || !subjectId || !roomNumber || !academicYear) {
            return res.status(400).send({ message: 'missing required field', success: false });
        }
        const result2 = await examModel.sheduleinsert(name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId);

        if (result2 && result2.length > 0) {
            return res.status(404).send({ message: result2, success: false });
        }
        return res.status(404).send({ message: result2, success: true });
    } catch (err) {
        res.status(500).send({ message: 'Failed to insert into the database', success: false });
    }
};

module.exports = {
    sheduleExam,
};
