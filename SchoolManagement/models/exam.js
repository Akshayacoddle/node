/* eslint-disable consistent-return */
const con = require('../config/connection');

const questionPaper = async ({
  exam,
}) => {
  const db = con.makeDb();
  const query0 = `select exam_type_id from exam where id=${exam};`;
  const result0 = await db.query(query0);
  const examVal = result0[0].exam_type_id;
  const query1 = `SELECT exam_type.type,exam_type.start_date FROM exam_type 
  right JOIN exam ON exam_type.id = exam.exam_type_id WHERE exam_type.id =${examVal};`;
  const result1 = await db.query(query1);

  const originalDate = new Date(result1[0].start_date);
  const newDate = new Date(originalDate);
  newDate.setDate(originalDate.getDate() + 1);
  const newDateString = newDate.toISOString().split('T')[0];

  const newName = `${result1[0].type}_${newDateString}`;
  return { result1, newName };
};

const paperInsert = async ({
  exam, newPath, finalFileName,
}) => {
  const db = con.makeDb();
  const qr1 = `select question_paper_id from exam where id=${exam}`;
  const result1 = await db.query(qr1);
  if (result1[0].question_paper_id == null) {
    const qr = `INSERT INTO question_paper(exam,path,file_name) VALUES ('${exam}','${newPath}','${finalFileName}');`;
    const result = await db.query(qr);
    const insertedId = result.insertId;
    const qr2 = `update exam set question_paper_id =${insertedId} where id =${exam};`;
    const result2 = await db.query(qr2);
  }
  const qr3 = `UPDATE question_paper SET path='${newPath}', file_name='${finalFileName}' WHERE exam = '${exam}'`;
  const result3 = await db.query(qr3);
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

module.exports = { sheduleinsert, questionPaper, paperInsert };
