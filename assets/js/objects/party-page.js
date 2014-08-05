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
		visualiserInterval: null,
		upperColour: '',
		lowerColour: '',
		onLowerColour: true
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

				initVisualiser();
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

		socket.emit(EVENT_DJ_POLL, req);
	}

	function startPlayback(track){
		// Send the track URL to the server.
		var req = getRequestObject();
		req.track = track;
		object.playingTrack = track;
		socket.emit(EVENT_DJ_SWITCH, req);

		initVisualiser();
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

	function initVisualiser(){
		// Set up the visualiser.
		if (object.visualiserInterval == null){
			object.upperColour = colourLuminance(object.playingTrack.colour, COLOUR_FLUCTUATION);
			object.lowerColour = colourLuminance(object.playingTrack.colour, (COLOUR_FLUCTUATION * -1));
			visualiser();
			visualiserInterval = setInterval(visualiser, VISUALISER_INTERVAL);
		}
	}

	function visualiser(){
		if (object.onLowerColour){
			$(object.element).css('background-color', object.upperColour);
		}
		else{
			$(object.element).css('background-color', object.lowerColour);
		}
		object.onLowerColour = !object.onLowerColour;
	}

	function destroy(){
	}

	return object;

}
