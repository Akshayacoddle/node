const con = require('../config/connection');

const view = async (startIndex, endIndex) => {
  const db = con.makeDb();
  let qr;
  let result;
  try {
    qr = await `select * from teacher limit ${startIndex} , ${endIndex}`;
    result = await db.query(qr);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};

const login = async (email, password) => {
  const db = con.makeDb();
  let result;
  try {
    const qr = 'select * from teacher where email=? and password =?';
    result = await db.query(qr, [email, password]);
    return result;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};

module.exports = { view, login };
