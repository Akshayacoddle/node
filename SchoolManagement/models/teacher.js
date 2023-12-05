/* eslint-disable consistent-return */
const con = require('../config/connection');

const view = async (startIndex, endIndex) => {
  const db = con.makeDb();
  try {
    const viewQuery = await `select * from teacher limit ${startIndex} , ${endIndex}`;
    const viewResult = await db.query(viewQuery);
    return viewResult;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};

const login = async (email, password) => {
  const db = con.makeDb();
  try {
    const loginQuery = 'select * from teacher where email=? and password =?';
    const loginResult = await db.query(loginQuery, [email, password]);
    return loginResult;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};

const authentication = async (id, role) => {
  const db = con.makeDb();
  try {
    const verifyQuery = `select id,name from teacher where role ='${role}' and id =${id};`;
    const verifyResult = await db.query(verifyQuery);
    return verifyResult;
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
};
module.exports = { view, login, authentication };
