/* eslint-disable consistent-return */
const con = require('../config/connection');

const questionPaper = async ({
  name,
  type,
  path,
  fileName,
}) => {
  let result = [];
  const db = con.makeDb();
  const qr1 = `select file_name from question_paper where file_name= '${fileName}';`;
  result = await db.query(qr1);
  console.log(result.length);
  if (result.length < 1) {
    console.log('hi');
    const qr = `INSERT INTO question_paper(name,type,path,file_name) VALUES ('${name}','${type}','${path}','${fileName}');`;
    const result1 = await db.query(qr);
    return result1;
  }
  return result;
};

const sheduleinsert = async ({
  name,
  classId,
  startDate,
  endDate,
  subjectId,
  roomNumber,
  academicYear,
  examTypeId,
  questionPaperId,
}) => {
  const db = con.makeDb();

  try {
    let result = [];
    let hasClassConflict = false;
    let hasRoomConflict = false;

    const timeduration = `SELECT * FROM exam WHERE (start_date BETWEEN '${startDate}' AND '${endDate}' OR end_date BETWEEN '${startDate}' AND '${endDate}') AND class_id = ${classId}`;
    const resTimeDuration = await db.query(timeduration);
    if (resTimeDuration.length > 0) {
      hasClassConflict = true;
      return resTimeDuration;
    }
    if (!hasClassConflict) {
      const durationRoom = `SELECT * FROM exam WHERE (start_date BETWEEN '${startDate}' AND '${endDate}' OR end_date BETWEEN '${startDate}' AND '${endDate}') AND room_number ='${roomNumber}'`;
      const resTimeRoom = await db.query(durationRoom);
      if (resTimeRoom.length > 0) {
        hasRoomConflict = true;
        return resTimeRoom;
      }
    }
    if (!hasClassConflict && !hasRoomConflict) {
      // question paper upload
      const qr = `INSERT INTO exam (name, class_id, start_date, end_date, subject_id, room_number, academic_year, exam_type_id,question_paper_id) VALUES ('${name}', ${classId}, '${startDate}', '${endDate}', ${subjectId}, '${roomNumber}', ${academicYear}, ${examTypeId},${questionPaperId});`;
      result = await db.query(qr);
      return result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await db.close();
  }
};

module.exports = { sheduleinsert, questionPaper };
