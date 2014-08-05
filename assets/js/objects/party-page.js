window.initScripts = (window.initScripts||{});
initScripts['party-page'] = function(element) {

	var object = {
		type: "party-page",
		element: element,
		slug: $(element).attr('data-slug'),
		destroy: destroy,
		isDj: false,
		pollTimeout: null,
		playingTrack: null
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

	function setDj(){
		object.isDj = true;
		object.pollInterval = setInterval(pollServer, POLL_INTERVAL);
	}

	function pollServer(){
		var req = getRequestObject();
		req.trackId = object.playingTrack == null ? -1 : playingTrack.spotifyId

		socket.emit(EVENT_DJ_POLL, req);
	}

	function destroy(){
	}

	return object;

}
