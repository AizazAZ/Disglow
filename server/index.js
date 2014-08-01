// CONSTANTS
var EVENT_JOIN_PARTY = 'party.join';


var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var io = require('socket.io')(http);

var parties = [];

// Connect the database
var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'fuzzdev',
	password : 'fuzzdev',
	database : 'wowhack2014'
});

db.query('SELECT id, name, slug FROM parties WHERE active = 1 ORDER BY created_at DESC', function(err, rows) {
	// connected! (unless `err` is set)
	// Add it to the parties array.
	for (var i = 0; i < rows.length; i++) {
		parties.push(rows[i].slug);
	}
	console.log(parties);
});

var connected = 0;
var namedUser = 0;

io.on('connection', function(socket){
	console.log('a user connected', socket);

	connected++;

	socket.on(EVENT_JOIN_PARTY, joinParty);






	var username = "";
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

function joinParty(partySlug){
	console.log(partySlug);
}