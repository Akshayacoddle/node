const con = require('../config/connection');
const view = async (startIndex, endIndex) => {
    let qr;
    let result
    try {

        qr = await `select * from teacher limit ${startIndex} , ${endIndex}`;
        result = await con.query(qr, (err, result) => {
            return result

        });
    }
    catch (err) {
        throw err;
    }
}

module.exports = { view }