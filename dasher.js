var express = require('express')
    , io = require('socket.io');

app = express.createServer();
app.use(express.logger());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.send('sup');
});

app.listen(80);
io.listen(app);

console.log('Server started on port %s', app.address().port);
