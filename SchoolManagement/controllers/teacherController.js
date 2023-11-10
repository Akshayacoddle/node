const con = require("../config/connection");
const teacherModel = require('../models/teacherModel')

const viewTeachers = async (req, res) => {
    let result;
    try {
        const page = req.query.page
        const limit = req.query.limit
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        result = await teacherModel.view(startIndex, endIndex);
        console.log(result);
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send({ error: "Failed to fetch from database" });
    }

}
module.exports = {
    viewTeachers
};