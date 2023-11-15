
const con = require("../config/connection");
const studentModel = require('../models/student');
const jwt = require('jsonwebtoken')
const createData = async (req, res) => {
    try {
        let result;
        const { rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode, passWord } = req.body;
        if (!rollNumber || !firstName || !lastName || !dateOfBirth || !gender || !aadharNumber || !nationality || !caste || !mobile || !address || !pinCode || !passWord) {
            return res.status(400).send({ message: "Missing required fields", success: false });
        }
        result = await studentModel.checkAadhar(aadharNumber)
        if (result.length > 0) {
            res.status(403).send({ message: "Already exists", success: false });
        }
        result = await studentModel.createUser(rollNumber, firstName, lastName, dateOfBirth, gender, aadharNumber, nationality, caste, mobile, address, pinCode, passWord)
        res.status(200).send({ message: "Data added successfully", success: true });
    }
    catch (err) {
        res.status(500).send({ message: "Failed to insert into the database", success: false });
    }
}

const login = async (req, res) => {
    let result;
    try {
        const { rollNumber, aadharNumber } = req.body;
        if (!rollNumber || !aadharNumber) {
            return res.status(400).send({ message: "Missing required fields", success: false });
        }
        result = await studentModel.studentLogin(rollNumber, aadharNumber)
        if (result.length > 0) {
            const id = result[0].id
            const jwtToken = jwt.sign({ id }, "scretekeyStudent");
            res.status(200).send({ message: "Login successful", jwtToken, success: true });
        }
        res.status(401).send({ message: "Invalid credentials", success: false });
    } catch (err) {
        res.status(401).send({ message: "Invalid credentials", success: false });
    }
}
const viewStudent = async (req, res) => {
    let result;
    try {
        const page = req.query.page
        const limit = req.query.limit
        const startIndex = (page - 1) * limit;
        result = await studentModel.view(startIndex, limit)
        result = result
        res.status(200).send({ message: "success", result, success: true });
    } catch (err) {
        console.log(err);
        console.log(result);
        res.status(500).send({ message: "Failed to fetch database", success: false });
    }
}

module.exports = {
    createData,
    login, viewStudent
};
