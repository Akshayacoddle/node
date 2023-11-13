const con = require('../config/connection');
const view = async (startIndex, endIndex) => {
    const db = con.makeDb();
    let qr;
    let result
    try {
        qr = await `select * from teacher limit ${startIndex} , ${endIndex}`;
        result = await db.query(qr);
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
    const db = con.makeDb();
    let result;
    try {
        const qr = await `select * from teacher where email=? and password =?`;
        result = db.query(qr, [email, password]);
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