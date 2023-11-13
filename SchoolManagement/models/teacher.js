const con = require('../config/connection');
const view = async (startIndex, endIndex) => {
    const db = con;
    let qr;
    let result
    try {
        qr = await `select * from teacher limit ${startIndex} , ${endIndex}`;
        result = await db.promise().query(qr);
        return result;
    }
    catch (err) {
        throw err;
    }
    finally {
        await db.close();
    }
}

const login = async (email, password) => {
    const db = con;
    let result;
    try {
        const qr = await `select * from teacher where email=? and password =?`;
        result = db.promise().query(qr, [email, password]);
        console.log(result);
        return result
    } catch (err) {
        throw err
    }
    finally {
        await db.close();
    }
}
module.exports = { view, login }