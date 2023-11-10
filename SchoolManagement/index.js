const express = require('express');
const app = express();

const studentSignup = require('./routes/studentRoute');
const teacher = require('./routes/teacherRoute');
const exam = require('./routes/examRoute');

app.use('/student', studentSignup);
app.use('/teacher', teacher)
app.use('/exam', exam)

app.listen(5001, function () {
    console.log('server listening at port 5001');

});