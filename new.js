

async function fetchData() {
    const url = 'http://localhost:5001/exam/classid';
    try {
        const response = await fetch(`${url}`, {

        });
        let html1 = '';
        let html2 = '';
        let html3 = '';
        let html4 = '';
        let html5 = '';

        const data = await response.json();
        if (data.message) {
            let i = 0;
            const { classIdResult, subjectIdResult, roomIdResult, academicYearResult, examTypeResult } = data.message;

            classIdResult.forEach((classItem) => {
                html1 += `<option value="${classItem.id}">${classItem.grade} -  ${classItem.academic_year}</option>`;
            });


            subjectIdResult.forEach((classItem) => {
                html2 += `<option value="${classItem.id}">${classItem.name}</option>`;
            });
            roomIdResult.forEach((classItem) => {
                html3 += `<option value="${classItem.id}">${classItem.name}</option>`;
            });
            academicYearResult.forEach((classItem) => {
                i += 1
                html4 += `<option value="${classItem.academic_year}">${classItem.academic_year}</option>`;
            });
            examTypeResult.forEach((classItem) => {
                html5 += `<option value="${classItem.id}">${classItem.type}</option>`;
            });

            document.getElementById('class1').innerHTML = html1;
            document.getElementById('subject').innerHTML = html2;
            document.getElementById('room').innerHTML = html3;
            document.getElementById('year').innerHTML = html4;
            document.getElementById('type').innerHTML = html5;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const examName = document.getElementById('examname').value;
    const selectedClass = document.getElementById('class1').value;
    const selectedSubject = document.getElementById('subject').value;
    const selectedRoom = document.getElementById('room').value;
    const academicYear = document.getElementById('year').value;
    const examType = document.getElementById('type').value;
    const startDate = document.getElementById('startdate').value;
    const endDate = document.getElementById('lastdate').value;
    const examData = {
        examName,
        selectedClass,
        selectedSubject,
        selectedRoom,
        academicYear,
        examType,
        startDate,
        endDate,
    };
    console.log('Request examData :', examData);
    const url = 'http://localhost:5001/exam/shedule';
    try {
        const response = await fetch(`${url}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzA1LCJpYXQiOjE3MDIwMjY2MTN9.GQc3iz6p6hAgR3ywbDYlRCnWNdDi3cRI71IQeSoOJOw',
            },
            body: JSON.stringify(examData),

        });
        console.log(response);
        const status = response.status
        if (status == 422) {
            document.getElementById('p').innerHTML = 'missing required field'
        } else if (status == 409) {
            document.getElementById('p').innerHTML = 'confilt in either class or room'
        } else if (status == 200) {
            document.getElementById('p').style.color = 'green'
            document.getElementById('p').innerHTML = 'data added successfully'
        } else if (status == 500) {
            document.getElementById('p').innerHTML = 'Failed to insert into the database'
        }

    } catch (error) {
        console.error('Error calling second API:', error);
    }
});
fetchData();
