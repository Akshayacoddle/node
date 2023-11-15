const con = require("../config/connection");
const sheduleinsert = async (name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId) => {
    let result;
    const db = con.makeDb();

    try {
        const checkClass = `SELECT * FROM exam WHERE class_id = ${classId}`;
        const roomAvilability = `SELECT * FROM exam WHERE room_number ='${roomNumber}'`;

        const resClass = await db.query(checkClass);
        const resRoom = await db.query(roomAvilability);

        let hasClassConflict = false;
        let hasRoomConflict = false;

        for (const examEntry of resClass) {
            const timeduration = `SELECT * FROM exam WHERE (start_date BETWEEN '${startDate}' AND '${endDate}' OR end_date BETWEEN '${startDate}' AND '${endDate}') AND id = ${examEntry.id}`;
            const resTimeDuration = await db.query(timeduration);
            if (resTimeDuration.length > 0) {
                hasClassConflict = true;
                return "Conflict with class schedule"
            }
        }
        if (!hasClassConflict) {
            for (const examEntry of resRoom) {
                const durationRoom = `SELECT * FROM exam WHERE (start_date BETWEEN '${startDate}' AND '${endDate}' OR end_date BETWEEN '${startDate}' AND '${endDate}') AND id = ${examEntry.id}`;
                const resTimeRoom = await db.query(durationRoom);

                if (resTimeRoom.length > 0) {
                    console.log("Conflict with room schedule");
                    hasRoomConflict = true;
                    return "Conflict with room schedule"
                }
            }
        }
        if (!hasClassConflict && !hasRoomConflict) {
            const qr = `INSERT INTO exam (name, class_id, start_date, end_date, subject_id, room_number, academic_year, exam_type_id) VALUES ('${name}', ${classId}, '${startDate}', '${endDate}', ${subjectId}, '${roomNumber}', ${academicYear}, ${examTypeId});`;
            result = await db.query(qr);
            return "Data inserted successfully";
        }
    } catch (error) {
        throw error;
    } finally {
        await db.close();
    }
};

module.exports = {
    sheduleinsert
};
