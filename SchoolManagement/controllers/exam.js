const examModel = require('../models/exam');

const sheduleExam = async (req, res) => {
    let result;
    let result2;
    try {
        const { name, classId, startDate, endDate, subjectId, roomNumber, academicYear } = req.body;
        if (!name || !classId || !startDate || !endDate || !subjectId || !roomNumber || !academicYear) {
            return res.status(400).send({ error: 'missing required field' });
        }
        result = await examModel.shedule(classId)
        result = result[0]
        if (result.length > 0) {
            res.status(404).send({ error: 'The given class is already have exam' });
        } else {
            result2 = await examModel.sheduleinsert(name, classId, startDate, endDate, subjectId, roomNumber, academicYear)
            res.status(200).send({ message: 'data added successfully' });
        }
    }
    catch (err) {
        res.status(500).send({ error: 'failed to insert into database' });
    }
};

module.exports = {
    sheduleExam,
};
