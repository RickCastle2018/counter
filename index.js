var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

http.listen(80, function () {
    console.log('Started.');
});

fs.writeFileSync("counter.txt", "0");

io.on('connection', function (socket, users) {
    counter = parseInt(fs.readFileSync("counter.txt", "utf8"));
    users = counter + 1;
    io.emit('info', users);
    fs.writeFileSync("counter.txt", users.toString());

    socket.on('disconnect', function () {
        counter = parseInt(fs.readFileSync("counter.txt", "utf8"));
        users = counter - 1;
        io.emit('info', users);
        fs.writeFileSync("counter.txt", users.toString());
    });
});