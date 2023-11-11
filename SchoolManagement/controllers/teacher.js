const con = require("../config/connection");
const teacherModel = require('../models/teacher')

const viewTeachers = async (req, res) => {
    let result;
    try {
        const page = req.query.page
        const limit = req.query.limit
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        result = await teacherModel.view(startIndex, endIndex);
        result = result[0]
        res.status(200).send({ message: "success", result });
    }
    catch (err) {
        res.status(500).send({ message: "Failed to fetch from database" });
    }

}
module.exports = {
    viewTeachers
};