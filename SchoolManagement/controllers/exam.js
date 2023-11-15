const examModel = require('../models/exam');

const sheduleExam = async (req, res) => {
    try {
        const { name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId } = req.body;
        if (!name || !classId || !startDate || !endDate || !subjectId || !roomNumber || !academicYear) {
            return res.status(400).send({ message: 'missing required field', success: false });
        }

        const result2 = await examModel.sheduleinsert(name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId);

        if (result2 && result2.length > 0) {
            res.status(401).send({ message: 'Conflict detected', success: true, conflicts: result2 });
        }
    } catch (err) {
        console.error("Error in sheduleExam:", err);
        res.status(500).send({ error: 'Failed to insert into database', success: false });
    }
};

module.exports = {
    sheduleExam,
};
