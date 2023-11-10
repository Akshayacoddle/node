// studentController.js
const con = require("../config/connection");
const studentModel = require('../models/studentModel');
const jwt = require('jsonwebtoken')
const createData = (req, res) => {
    console.log(req.body);
    const { rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode } = req.body;

    if (!rollNumber || !firstName || !lastName || !dateOfBirth || !gender || !aadharNumber || !nationality || !caste || !mobile || !address || !pinCode) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    studentModel.createUser(rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode,
        function (err, result) {
            if (err) {
                res.status(500).send({ error: "Failed to insert into the database" });
            } else {
                res.status(200).send({ message: "Data added successfully" });
            }
        }
    );
}

const login = (req, res) => {
    const { rollNumber, aadharNumber } = req.body;

    if (!rollNumber || !aadharNumber) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    studentModel.studentLogin(rollNumber, aadharNumber, (err, user) => {
        if (err) {
            res.status(500).send({ error: "Failed to fetch  database" });
        } else {
            if (user.length > 0) {
                const id = user[0].id
                const jwtToken = jwt.sign({ id }, "scretekeyStudent");
                res.status(200).send({ message: "Login successful", jwtToken });
            } else {
                res.status(401).send({ error: "Invalid credentials" });
            }
        }
    });
}

const viewStudent = (req, res) => {
    const page = req.query.page
    const limit = req.query.limit
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    studentModel.view(startIndex, endIndex, (err, students) => {
        if (err) {
            res.status(500).send({ message: "Failed to fetch database" });
        } else {
            res.status(200).send(students);
        }
    });
};

const updateStudent = (req, res) => {
    const { id, address } = req.body;
    studentModel.view(id, address, (err, students) => {
        if (err) {
            console.log(students);
            res.status(500).send({ message: "Failed to fetch database" });
        } else {
            res.status(200).send(students);
        }
    });
};
const viewOneStudent = (req, res) => {
    let id = req.params.id;
    console.log(id);
    studentModel.viewOne(id, (err, student) => {
        if (err) {
            res.status(500).send({ message: "Failed to fetch database" });
        } else {
            res.status(200).send({ message: "success" });
        }
    });
}
module.exports = {
    createData,
    login, viewStudent, updateStudent, viewOneStudent
};
