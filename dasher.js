var express = require('express')
    , socketio = require('socket.io');

app = express.createServer();
app.use(express.logger());
app.use(express.static(__dirname + '/public'));
app.listen(80);

//HTTP
app.get('/', function(req, res) {
    res.send('sup');
});

//WebSocket
io = socketio.listen(app);

io.sockets.on('connection', function(socket) {
    console.log('Client connected');
    socket.emit('foo', {payload: 'sup'});
});

setInterval(function(){
    io.sockets.emit('foo', {payload: new Date().getTime()});
}, 1000);

console.log('Server started on port %s', app.address().port);
