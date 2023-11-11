
const con = require("../config/connection");

const shedule = async (classId) => {
    let result;
    try {
        const qr = await `select class_id from exam where class_id =${classId}`
        result = con.promise().query(qr)
        return result;
    } catch (err) {
        throw err
    }
}
const sheduleinsert = async (name, classId, startDate, endDate, subjectId, roomNumber, academicYear) => {
    let result;
    try {
        const qr = await `insert into exam (name, class_id, start_date, end_date, subject_id, room_number, academic_year) values ('${name}', ${classId}, '${startDate}', '${endDate}', ${subjectId}, '${roomNumber}', ${academicYear});`;
        result = con.promise().query(qr)
        return result;
    } catch (err) {
        throw err
    }
}

module.exports = {
    shedule, sheduleinsert
}