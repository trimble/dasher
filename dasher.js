var express = require('express')
    , socketio = require('socket.io')
    , rss = require('easyrss')
    , _ = require('underscore')
    , inspect = require('util').inspect;

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
});

lastChecked = new Date();
lastChecked.setMinutes(lastChecked.getMinutes() - 2);
pollRss = function(){
    console.log('Checking RSS...');
    rss.parseURL('http://www.reddit.com/new/.rss?sort=new', function(posts) {
        _.each(posts.reverse(), function(post){
            if (post.pubDate > lastChecked) {
                lastChecked = post.pubDate;
                io.sockets.emit('newItem', {payload: post.title});
            }
        });
    });
};

setInterval(pollRss, 10000);

console.log('Server started on port %s', app.address().port);
