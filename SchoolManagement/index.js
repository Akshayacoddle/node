const express = require('express');

const app = express();

const studentSignup = require('./routes/student');
const teacher = require('./routes/teacher');
const exam = require('./routes/exam');

app.use('/student', studentSignup);
app.use('/teacher', teacher);
app.use('/exam', exam);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/question', express.static('upload/images'));

app.listen(8080, () => {
  console.log('server listening at port 8080');
});
