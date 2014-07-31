var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
var connected = 0;
var namedUser = 0;
 
io.on('connection', function(socket){
  console.log('a user connected');
  var username = "";
 
  connected++;
 
  io.emit('status message', 'there are ' + connected + ' people online.');
 
  socket.on('disconnect', function(){
    console.log('user disconnected');
 
    connected--;
  });
 
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
 
    socket.broadcast.emit('chat message', {
      'message': msg,
      username: username
    });
  });
 
  socket.on('username', function(uname){
    console.log('username: ' + username);
 
    username = uname;
    socket.broadcast.emit('username', username);
  });
});
 
http.listen(3000, function(){
    console.log('listening on *:3000');
});