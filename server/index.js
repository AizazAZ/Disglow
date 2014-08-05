// CONSTANTS
var EVENT_JOIN_PARTY = 'party.join';
var EVENT_DJ_POLL = 'dj.poll';
var EVENT_DJ_SWITCH = 'dj.switch';
var EVENT_DJ_ASSIGN = 'dj.assign';
var EVENT_LISTENER_SYNC = 'listener.sync';


var app = require('express')();
var http = require('http').Server(app);
var mysql = require('mysql');
var io = require('socket.io')(http);

var parties = [];
var partiesById = [];
var partiesSlugs = [];

var users = [];

var currentId = 1;

// Connect the database
var db = mysql.createConnection({
	host     : 'localhost',
	user     : 'fuzzdev',
	password : 'fuzzdev',
	database : 'wowhack2014'
});


// Set up the parties.
db.query('SELECT id, name, slug FROM parties WHERE active = 1 ORDER BY created_at DESC', function(err, rows) {
	// Add it to the parties arrays.
	for (var i = 0; i < rows.length; i++) {
		var row = rows[i];
		addParty(row.id, row.name, row.slug);
	}
});

var connected = 0;
var namedUser = 0;

io.on('connection', connection);

http.listen(3000, function(){
	console.log('listening on *:3000');
});

function connection(socket){

	console.log('a user connected');

	// Set up the user.
	socket.user = {
		sessionId: currentId,
		latestTime: 0,
		currentParty: null,
		isDj: false
	};
	currentId++;

	connected++;
	socket.id = socket.user.sessionId;

	// When they join a party.
	socket.on(EVENT_JOIN_PARTY, function(req){
		console.log('Joined a party', req);
		// Ensure it's an existing party.
		var party = getPartyBySlug(req.partySlug);
		if (party != null){
			// Connect them to the relevant room.
			socket.join(party.slug);

			if (party.connectedUsers.length == 0){
				// This user needs to be set as the DJ.
				socket.user.isDj = true;
				socket.emit(EVENT_DJ_ASSIGN, "");
			}
			party.connectedUsers.push(socket.user);
			socket.user.currentParty = party.slug;
		}
	});

	socket.on(EVENT_DJ_POLL, function(req){
		// console.log('DJ poll', req, user.isDj);
		// Ensure the user is in fact a DJ.
		if (socket.user.isDj){
			req.partySlug = socket.user.currentParty;
			socket.broadcast.emit(EVENT_LISTENER_SYNC, req);
		}
	});

	socket.on('disconnect', function(){
		console.log('a user disconnected')
		connected--;
		if (socket.user.currentParty != null){
			socket.leave(socket.user.currentParty);
		}
	});
}

function addParty(partyId, partyName, partySlug){
	var party = {
		id: partyId,
		name: partyName,
		slug: partySlug,
		connectedUsers: []
	}
	parties.push(party);
	partiesById[partyId] = party;
	partiesSlugs.push(partySlug);
}

function getPartyBySlug(slug){
	var partyIndex = partiesSlugs.indexOf(slug);
	if (partyIndex > -1){
		return parties[partyIndex];
	}
	else{
		return null;
	}
}