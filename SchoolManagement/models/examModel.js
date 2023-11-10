
const con = require("../config/connection");

const shedule = (classId, callback) => {
    const qr = `select class_id from exam where class_id =${classId}`
    con.query(qr, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })

};
const sheduleinsert = (name, classId, startDate, endDate, subjectId, roomNumber, academicYear, callback) => {
    const qr = `insert into exam (name, class_id, start_date, end_date, subject_id, room_number, academic_year) values ('${name}', ${classId}, '${startDate}', '${endDate}', ${subjectId}, '${roomNumber}', ${academicYear});`;
    con.query(qr, (err, result) => {
        if (err) {
            callback(err)
        } else {
            console.log(result);
            callback(null, result);
        }
    })
}

module.exports = {
    shedule, sheduleinsert
}