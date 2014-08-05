window.initScripts = (window.initScripts||{});
initScripts['party-page'] = function(element) {

	var object = {
		type: "party-page",
		element: element,
		slug: $(element).attr('data-slug'),
		destroy: destroy,
		isDj: false,
		pollTimeout: null,
		playingTrack: null,
		startPlayback: startPlayback
	};

	// Connect to the party.
	var req = getRequestObject();
	req.partySlug = object.slug
	socket.emit(EVENT_JOIN_PARTY, req);

	// Listen for events.
	socket.on(EVENT_DJ_ASSIGN, function(){
		console.log('Assigned as DJ', req);
		setDj();
    });

	socket.on(EVENT_LISTENER_SYNC, function(req){
		if (req.partySlug == object.slug && !object.isDj){
			console.log('Listener sync', req);
		}
    });

	socket.on(EVENT_LISTENER_SYNC, function(req){
		if (isListenerOfParty(req.partySlug)){
			
		}
    });

	socket.on(EVENT_LISTENER_SWITCH, function(req){
		// Set the track.
		if (typeof req.track == 'undefined'){
			return;
		}

		if (isListenerOfParty(req.partySlug)){
			console.log('Listener switch', req);

			object.playingTrack = req.track;

			if (object.playingTrack != null){
				// Get the player and start playback!
				var players = objectManager.getObjectsOfType('player');
				for (var i = 0; i < players.length; i++) {
					players[i].play(object.playingTrack);
					console.log(players[i].play);
				}
			}
		}
    });

	function setDj(){
		object.isDj = true;
		object.pollInterval = setInterval(pollServer, POLL_INTERVAL);
		$(object.element).addClass('is-dj');
	}

	function pollServer(){
		var req = getRequestObject();
		req.trackId = object.playingTrack == null ? -1 : playingTrack.spotifyId

		socket.emit(EVENT_DJ_POLL, req);
	}

	function startPlayback(track){
		// Send the track URL to the server.
		var req = getRequestObject();
		req.track = track;
		socket.emit(EVENT_DJ_SWITCH, req);
	}

	function isListenerOfParty(partySlug){
		return partySlug == object.slug && !object.isDj;
	}

	function destroy(){
	}

	return object;

}
