const con = require("../config/connection");
const sheduleinsert = async (name, classId, startDate, endDate, subjectId, roomNumber, academicYear, examTypeId) => {
    let result;
    const db = con.makeDb();

    try {
        const roomAvilability = `SELECT * FROM exam WHERE room_number ='${roomNumber}'`;
        const checkClass = `SELECT * FROM exam WHERE class_id = ${classId}`;

        const resClass = await db.query(checkClass);
        const resRoom = await db.query(roomAvilability);

        let hasClassConflict = false;
        let hasRoomConflict = false;

        for (const examEntry of resClass) {
            const timeduration = `SELECT * FROM exam WHERE (start_date BETWEEN '${startDate}' AND '${endDate}' OR end_date BETWEEN '${startDate}' AND '${endDate}') AND id = ${examEntry.id}`;
            const resTimeDuration = await db.query(timeduration);

            if (resTimeDuration.length > 0) {
                console.log("Conflict with class schedule");
                hasClassConflict = true;
                break; // exit the loop if there is a conflict
            }
        }

        if (!hasClassConflict) {
            for (const examEntry of resRoom) {
                const durationRoom = `SELECT * FROM exam WHERE (start_date BETWEEN '${startDate}' AND '${endDate}' OR end_date BETWEEN '${startDate}' AND '${endDate}') AND id = ${examEntry.id}`;
                const resTimeRoom = await db.query(durationRoom);

                if (resTimeRoom.length > 0) {
                    console.log("Conflict with room schedule");
                    hasRoomConflict = true;
                    break; // exit the loop if there is a conflict
                }
            }
        }

        if (!hasClassConflict && !hasRoomConflict) {
            // No conflicts, proceed with insertion
            const qr = `INSERT INTO exam (name, class_id, start_date, end_date, subject_id, room_number, academic_year, exam_type_id) VALUES ('${name}', ${classId}, '${startDate}', '${endDate}', ${subjectId}, '${roomNumber}', ${academicYear}, ${examTypeId});`;
            result = await db.query(qr);
            console.log("Data inserted successfully");
            return result;
        }
    } catch (error) {
        console.error("Error executing queries:", error);
        throw error;
    } finally {
        await db.close();
    }
};

module.exports = {
    sheduleinsert
};
