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
		startPlayback: startPlayback,
		players: null,
		playbackContext: null
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
		if (!isValidTrack(req.track)){
			return;
		}

		if (isListenerOfParty(req.partySlug)){
			console.log('Listener sync', req);

			// If no track is playing, start it playing.
			if (object.playingTrack == null){
				object.playingTrack = req.track;

				var players = getPlayers();
				for (var i = 0; i < players.length; i++) {
					players[i].play(object.playingTrack);
				}
			}
		}
    });

	socket.on(EVENT_LISTENER_SWITCH, function(req){
		console.log('Listener switch', req);
		if (!isValidTrack(req.track)){
			return;
		}

		if (isListenerOfParty(req.partySlug)){
			console.log('Listener switch', req);

			object.playingTrack = req.track;

			if (object.playingTrack != null){
				// Get the player and start playback!
				var players = getPlayers();
				for (var i = 0; i < players.length; i++) {
					players[i].play(object.playingTrack);
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
		req.track = object.playingTrack;
		
		if (object.playbackContext) {
			req.playbackPosition = object.playbackContext.currentTime;
		}

		console.log('Poll Server', req);

		socket.emit(EVENT_DJ_POLL, req);
	}

	function startPlayback(playbackContext, track){
		// Send the track URL to the server.
		var req = getRequestObject();
		req.track = track;
		object.playbackContext = playbackContext;
		object.playingTrack = track;
		socket.emit(EVENT_DJ_SWITCH, req);
	}

	function isListenerOfParty(partySlug){
		return partySlug == object.slug && !object.isDj;
	}

	function getPlayers(){
		if (object.players == null){
			object.players = objectManager.getObjectsOfType('player');
		}
		return object.players;
	}

	function destroy(){
	}

	return object;

}
