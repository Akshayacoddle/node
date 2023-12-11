/* eslint-disable consistent-return */
const con = require('../config/connection');

const questionPaper = async ({
  exam,
}) => {
  const db = con.makeDb();
  const examTypequery = `select exam_type_id from exam where id=${exam};`;
  const examTypeResult = await db.query(examTypequery);
  const examVal = examTypeResult[0].exam_type_id;
  const examStartDateQuery = `SELECT exam_type.type,exam_type.start_date FROM exam_type 
  right JOIN exam ON exam_type.id = exam.exam_type_id WHERE exam_type.id =${examVal};`;
  const examStartDateResult = await db.query(examStartDateQuery);
  const originalDate = new Date(examStartDateResult[0].start_date);
  const newDate = new Date(originalDate);
  newDate.setDate(originalDate.getDate() + 1);
  const newDateString = newDate.toISOString().split('T')[0];

  const newName = `${examStartDateResult[0].type}_${newDateString}`;
  return { examStartDateResult, newName };
};

const paperInsert = async ({
  exam, newPath, finalFileName,
}) => {
  const db = con.makeDb();
  const questionPaperIdQuery = `select question_paper_id from exam where id=${exam}`;
  const questionPaperIdResult = await db.query(questionPaperIdQuery);
  if (questionPaperIdResult[0].question_paper_id == null) {
    const paperInsertquery = `INSERT INTO question_paper(exam,path,file_name) VALUES ('${exam}','${newPath}','${finalFileName}');`;
    const paperInsertResult = await db.query(paperInsertquery);
    const insertedId = paperInsertResult.insertId;
    const examUpdateQuery = `update exam set question_paper_id =${insertedId} where id =${exam};`;
    await db.query(examUpdateQuery);
  }
  const paperUpdateQuery = `UPDATE question_paper SET path='${newPath}', file_name='${finalFileName}' WHERE exam = '${exam}'`;
  await db.query(paperUpdateQuery);
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
      const qr = `INSERT INTO exam (name, class_id, start_date, end_date, subject_id, room_number, academic_year, exam_type_id) VALUES ('${name}', ${classId}, '${startDate}', '${endDate}', ${subjectId}, '${roomNumber}', ${academicYear}, ${examTypeId});`;
      result = await db.query(qr);
      return result;
    }
  } catch (error) {
    console.log(error);
  } finally {
    await db.close();
  }
};

const generateHallTicket = async ({ classes, examType }) => {
  const db = con.makeDb();
  try {
    let k = 0;
    const studentClassQuery = `select class.academic_year,student.id,first_name,class.grade, student.class_id,class.grade from class inner join exam on  class.id = exam.class_id
    inner join student on  class.id = student.class_id
    WHERE class.id = '${classes}' group by student.id ORDER BY student.first_name,last_name;`;
    const studentClassResult = await db.query(studentClassQuery);
    const examYearQuery = `select EXTRACT(YEAR FROM start_date) as year,type,start_date,end_date from akshaya.exam_type where id=${examType}`;
    const examYearResult = await db.query(examYearQuery);
    const academicYear = studentClassResult[0].academic_year + 1;
    const examYear = examYearResult[0].year;
    const examfinal = examYearResult[0].type;
    const checkingExamYearQuery = `SELECT * FROM akshaya.hall_ticket WHERE class_id = '${classes}' AND exam_seat LIKE '${examYearResult[0].year}%';`;
    const checkingExamYearResult = await db.query(checkingExamYearQuery);
    const examRoomQuery = 'select * from room;';
    const examRoomResult = await db.query(examRoomQuery);
    let j = 0;
    let i = 0;
    if (checkingExamYearResult.length <= 1 && examYear === academicYear && examfinal === 'FinalExam') {
      studentClassResult.forEach((element) => {
        const capacityForEachClass = Math.floor(examRoomResult[k].capacity / 3);
        if (capacityForEachClass === 0 || j === capacityForEachClass) {
          j = 0;
          k += 1;
        }
        const roomid = examRoomResult[k].id;
        const qr7 = `select room_id from akshaya.exam_room_availability  where room_id=${roomid};`;
        db.query(qr7);
        i += 1;
        j += 1;
        const hallTicketInsertQuery = `INSERT INTO akshaya.hall_ticket (exam_type_id, exam_seat, class_id, student_id,room_id) VALUES ('${examType}', '${examYearResult[0].year + element.grade + i}', '${classes}',${element.id},${examRoomResult[k].id});`;
        db.query(hallTicketInsertQuery);
      });
    }
    return { checkingExamYearResult, examYearResult };
  } catch (error) {
    console.log(error);
  } finally {
    await db.close();
  }
};
const hallTicketViews = async ({ admissionNo }) => {
  const db = con.makeDb();
  try {
    const studentHallticketQuery = `select student.class_id,
    concat_ws(' ',first_name,last_name) as full_name,student.date_of_birth,student.address,class.grade,exam_type.type,exam_type.start_date,hall_ticket.exam_seat,room.name as class_room
    from student inner join admission on student.id=admission.student_id
   inner join hall_ticket on student.id=hall_ticket.student_id
   inner join class on class.id=student.class_id
   inner join exam_type on exam_type.id=hall_ticket.exam_type_id
   inner join room on room.id=hall_ticket.room_id
    where admission.id=${admissionNo}`;
    const studentHallticketResult = await db.query(studentHallticketQuery);
    const classes = studentHallticketResult[0].class_id;
    const examSubjectQuery = `select subject.name as subject,exam_type_id,exam.class_id,exam.start_date,exam.end_date from class inner join student on class.id=student.class_id
    inner join exam on class.id=exam.class_id
    inner join exam_type on exam_type.id=exam.exam_type_id
    inner join subject on subject.id =exam.subject_id where exam.class_id= ${classes} and exam_type_id =3 group by 
     subject.name ,exam_type_id,exam.class_id,exam.start_date,exam.end_date;`;
    const examSubjectResult = await db.query(examSubjectQuery);
    return { studentHallticketResult, examSubjectResult };
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};
module.exports = {
  sheduleinsert, questionPaper, paperInsert, generateHallTicket, hallTicketViews,
};
