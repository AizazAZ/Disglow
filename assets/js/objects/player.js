initScripts['player'] = function(element) {

	var object = {
		type: "player",
		element: element,
		destroy: destroy,
		play: play
	};

	console.log('Player instantiatied');


	var player = new Player();

	ko.applyBindings(player, $(element)[0]);

	player.init();
	
	function play(track){
		player.play(track);
	}

	function destroy(){
	}

	return object;

}



function Player() {

	var self = this;

	this.context = null;

	this.query = ko.observable();

	this.query.subscribe(function(newValue) {

		self.searchSpotify(newValue);
	});

	this.tracks = ko.observableArray();

	this.queue = ko.observableArray();

	this.queuePosition = 0;

	this.source = null;

	this.partyPages = null;



	this.init = function() {

		window.AudioContext = window.AudioContext||window.webkitAudioContext;

		self.context = new AudioContext();

		//var filter = self.context.createBiquadFilter();
		//filter.type = 'lowpass';

	};


}



Player.prototype.searchSpotify = function(query) {

	var self = this;


	$.get('https://api.spotify.com/v1/search?q=' + query + '&type=track').done(function(response) {

		var toPush = [];

		response.tracks.items.forEach(function(track) {

			var t = new Player.track(track, self);

			toPush.push(t);

		});

		self.tracks(toPush);

	});
};


/* Track object */

Player.track = function(data, player) {

	this.name = data.name;
	this.artist = data.artists[0].name;
	this.preview = data.preview_url;
	this.colour = randomHexColour();
	this.buffered = false;
	this.buffering = false;

	this.add = function() {

		player.queue.push(this);
		player.bufferTracks();

	};

	this.remove = function() {

		player.queue.remove(this);
	}
};




Player.prototype.doPlayClick = function() {

	var self = this;
	
	// Get the top track.
	var track = this.queue()[0];

	// Inform the parties!
	self.partyPages = objectManager.getObjectsOfType('party-page');
	for (var i = 0; i < self.partyPages.length; i++) {
		console.log(self.partyPages);
		self.partyPages[i].startPlayback(self.context, {
			name: track.name,
			artist: track.artist,
			preview: track.preview,
			colour: track.colour
		});
	}

	// Play the track.
	this.play(track);
}


Player.prototype.play = function(track) {
	
	var self = this;


	// self.queue()[0].start(0);

	track.source.start(0);

	track.source.onended = function() {
		console.log('sound ended');
		self.queue()[0].remove();
		self.doPlayClick();
		self.bufferTracks();
	};


	// Buffer track in queue then play.

	/*bufferLoader = new BufferLoader(
		self.context, [track.preview], function(bufferList) {

			if (self.source) {
				console.log('already source', self.source);
				self.source.stop(0);
			}

			self.source = self.context.createBufferSource();
			self.source.buffer = bufferList[0];

			console.log('source', self.source);
			console.log('buffer', self.source.buffer);

			//source.connect(filter);
			//filter.connect(context.destination);
			self.source.connect(self.context.destination);

			self.source.onended = function() {
				console.log('sound ended');
				self.queue()[0].remove();
				self.doPlayClick();
			};

			self.source.start(0);

			//setInterval(function() {

				//console.log(self.context.currentTime);


			//}, 100)

			console.log(self.context);

			
		}
	);

	bufferLoader.load();*/



	// When track is nearly at end, buffer next track.

	// Notify server of next track.


};

Player.prototype.stop = function() {
		

};


Player.prototype.bufferTracks = function() {

	var self = this;

	console.log('buffer tracks', self.queue());
	console.log(self.queue()[0]);



	// Buffer first two tracks in the queue

	for (var i = 0, len = self.queue().length; i < len && i < 2; i++) {
		
		var track = self.queue()[i];

		if (!track.buffered && !track.buffering) {

			track.buffering = true;

			bufferLoader = new BufferLoader(
				self.context, [track.preview], function(bufferList) {

					track.buffered = true;
					track.buffering = false;

					track.source = self.context.createBufferSource();
					track.source.buffer = bufferList[0];

					console.log('source', track.source);
					console.log('buffer', track.source.buffer);

					//source.connect(filter);
					//filter.connect(context.destination);
					track.source.connect(self.context.destination);

					// self.source.onended = function() {
					// 	console.log('sound ended');
					// 	self.queue()[0].remove();
					// 	self.doPlayClick();
					// };

				}
			);

			bufferLoader.load();

		}
	};

};


Player.prototype.nextTrack = function() {

	var self = this;

	/*if (self.queue().length > 1) {

		var track = self.queue()[1];

		bufferLoader = new BufferLoader(

			self.context, [track.preview], function(bufferList) {

				
				var nextTrackInterval = setInterval(function() {
	
					if (self.context.currentTime - self.source.buffer.duration < 5) {
						// Cross fade tracks
					}

				});

				if (self.source) {
					console.log('already source', self.source);
					self.source.stop(0);
				}

				self.source = self.context.createBufferSource();
				self.source.buffer = bufferList[0];

				//source.connect(filter);
				//filter.connect(context.destination);
				self.source.connect(self.context.destination);

				self.source.onended = function() {
					console.log('sound ended');
					self.queue()[0].remove();
					self.doPlayClick();
				};

				self.source.start(0);

				//setInterval(function() {

					//console.log(self.context.currentTime);


				//}, 100)

				console.log(self.context);

				
			}
		);
	}*/

};



function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
	// Asynchronously decode the audio file data in request.response
	loader.context.decodeAudioData(
	  request.response,
	  function(buffer) {
		if (!buffer) {
		  alert('error decoding file data: ' + url);
		  return;
		}
		loader.bufferList[index] = buffer;
		if (++loader.loadCount == loader.urlList.length)
		  loader.onload(loader.bufferList);
	  },
	  function(error) {
		console.error('decodeAudioData error', error);
	  }
	);
  }

  request.onerror = function() {
	alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}


