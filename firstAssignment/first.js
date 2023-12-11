let http = require('http')
http.createServer(function (req, res) {
    res.write('Hi Akshaya')
    res.end()
}).listen(8080, () => {
    console.log('server is running');
})