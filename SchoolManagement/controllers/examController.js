const examModel = require('../models/examModel');

const sheduleExam = (req, res) => {
    const { name, classId, startDate, endDate, subjectId, roomNumber, academicYear } = req.body;
    if (!name || !classId || !startDate || !endDate || !subjectId || !roomNumber || !academicYear) {
        return res.status(400).send({ error: 'missing required field' });
    }

    examModel.shedule(classId, function (err, result) {
        if (err) {
            res.status(500).send({ error: 'failed to insert into database' });
        } else if (result.length > 0) {
            res.status(404).send({ error: 'The given class is already have exam' });
        } else {
            examModel.sheduleinsert(name, classId, startDate, endDate, subjectId, roomNumber, academicYear,
                function (err, result) {
                    if (err) {
                        res.status(500).send({ message: 'failed to insert into database' });
                    } else {
                        res.status(200).send({ message: 'data added successfully' });
                    }
                }
            );

        }
    });
};

module.exports = {
    sheduleExam,
};
