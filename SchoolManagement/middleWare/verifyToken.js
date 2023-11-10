const verifyJwt = (req, res, next) => {
    const token = req.headers["access-token"]
    if (!token) {
        return res.json("token is not generated")
    } else {
        jwt.verify(token, "scretekeyStudent", (err, decoded) => {
            if (err) {
                res.json("Not Authenticated")
            } else {
                req.userId = decoded.id
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
