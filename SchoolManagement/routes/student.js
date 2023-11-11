const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
//const verifyJwt = require('../middleWare/verifyToken');
const signController = require('../controllers/student')
const jsonParser = bodyParser.json();
router.use(jsonParser)

router.post('/register', signController.createData);
router.post('/login', signController.login);
router.get('/view', signController.viewStudent)
router.get('/viewone/', signController.viewOneStudent)
router.put('/update', signController.updateStudent)
//router.get('/authenticate', verifyJwt.verifyJwt);

module.exports = router;