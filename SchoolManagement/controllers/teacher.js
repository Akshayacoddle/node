const con = require("../config/connection");
const teacherModel = require('../models/teacher')

const login = async (req, res) => {
    let result;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ message: "Missing required fields", success: false });
        }
        result = await teacherModel.login(email, password)

        if (result.length > 0) {
            res.status(200).send({ message: "Login successful", success: true });
        }
    } catch (err) {

        res.status(401).send({ message: "Invalid credentials", success: false });
    }
}
const viewTeachers = async (req, res) => {
    let result;
    try {
        const page = req.query.page
        const limit = req.query.limit
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        result = await teacherModel.view(startIndex, endIndex);
        result = result[0]
        res.status(200).send({ message: "success", success: true });
    }
    catch (err) {
        res.status(500).send({ message: "Failed to fetch from database", success: false });
    }

}
module.exports = {
    viewTeachers, login
};