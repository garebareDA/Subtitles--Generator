var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8000;

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

app.use('/public', express.static('public'))

io.on('connection',function(socket){

    socket.on('message',function(msg){
        console.log('message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('remove',function(msg){
        console.log(msg);
        socket.broadcast.emit('remove',msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});