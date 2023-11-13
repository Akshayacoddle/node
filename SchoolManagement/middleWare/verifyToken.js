const jwt = require('jsonwebtoken')
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
        return res.json("token is not generated")
    } else {
        let token = authHeader.split(" ")[1]
        jwt.verify(token, "scretekeyStudent", (err, decoded) => {
            if (err) {
                console.log(token);
                res.json("Not Authenticated")
            } else {
                next();
            }
        })
    }
}
/*app.get('/checkauth', verifyJwt, (req, res) => {
    return res.json("Authenticated")
})*/

module.exports = {
    verifyJwt
};
