const con = require('../config/connection');
const view = async (startIndex, endIndex) => {
    let qr;
    let result
    try {
        qr = await `select * from teacher limit ${startIndex} , ${endIndex}`;
        result = await con.promise().query(qr);
        return result;
    }
    catch (err) {
        throw err;
    }
}

const login = async (email, password) => {
    let result;
    try {
        const qr = await `select * from teacher where email=? and password =?`;
        result = con.promise().query(qr, [email, password]);
        console.log(result);
        return result
    } catch (err) {
        throw err
    }
}
module.exports = { view, login }