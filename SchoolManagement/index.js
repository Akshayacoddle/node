const express = require('express');
const app = express();

const studentSignup = require('./routes/student');
const teacher = require('./routes/teacher');
const exam = require('./routes/exam');

app.use('/student', studentSignup);
app.use('/teacher', teacher)
app.use('/exam', exam)

app.listen(5001, function () {
    console.log('server listening at port 5001');

});