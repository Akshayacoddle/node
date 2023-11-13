const examModel = require('../models/exam');

const sheduleExam = async (req, res) => {
    let result;
    let result2;
    try {
        const { name, classId, startDate, endDate, subjectId, roomNumber, academicYear } = req.body;
        if (!name || !classId || !startDate || !endDate || !subjectId || !roomNumber || !academicYear) {
            return res.status(400).send({ message: 'missing required field', success: false });
        }
        result = await examModel.shedule(classId)
        result = result[0]
        if (result.length > 0) {
            res.status(404).send({ message: 'The given class is already have exam', success: false });
        } else {
            result2 = await examModel.sheduleinsert(name, classId, startDate, endDate, subjectId, roomNumber, academicYear)
            res.status(200).send({ message: 'data added successfully', success: true });
        }
    }
    catch (err) {
        res.status(500).send({ error: 'failed to insert into database', success: false });
    }
};

module.exports = {
    sheduleExam,
};
