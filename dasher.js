var app = require('express').createServer()
    , io = require('socket.io').listen(app);

app.listen(80);

app.get('/', function(req, res) {
    res.send('sup');
});
