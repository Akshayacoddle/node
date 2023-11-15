const examModel = require('../models/exam');

const sheduleExam = async (req, res) => {
    let result;
    let result2;
    try {
        const { name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId } = req.body;
        if (!name || !classId || !startDate || !endDate || !subjectId || !roomNumber || !academicYear) {
            return res.status(400).send({ message: 'missing required field', success: false });
        }
        result2 = await examModel.sheduleinsert(name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId)
        if (result2.length > 0) {
            res.status(401).send({ message: 'already exist', success: true });
        } else {
            // result = examModel.shedule(name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId)
            res.status(200).send({ message: 'data added successfully', success: true });

        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ error: 'failed to insert into database', success: false });
    }
};

module.exports = {
    sheduleExam,
};
