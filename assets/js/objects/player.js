//window.initScripts = (window.initScripts||{});
initScripts['player'] = function(element) {

	var object = {
		type: "player",
		element: element,
		destroy: destroy,
		play: play
	};

	console.log('Hello from player!!!!');


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

/*var context;
window.addEventListener('load', init, false);
function init() {
  try {
	// Fix up for prefixing
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
	context = new AudioContext();

	console.log(context);
  }
  catch(e) {
	alert('Web Audio API is not supported in this browser');
  }
}*/


function Player() {

	var self = this;

	this.context = null;

	var self = this;


	this.init = function() {

		self.context = new AudioContext();
		//var analyser = context.createAnalyser();

		// Wait for window.onload to fire. See crbug.com/112368
		//window.addEventListener('load', function(e) {

		var filter = self.context.createBiquadFilter();
		//filter.type = 0;
		filter.type = 'lowpass';

	};

	this.query = ko.observable();

	this.query.subscribe(function(newValue) {

		self.searchSpotify(newValue);
	});

	this.tracks = ko.observableArray();

	this.queue = ko.observableArray();

	this.queuePosition = 0;

	this.source = null;
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


Player.prototype.getSpotifyTrack = function() {

	//$.get('https://api.spotify.com/v1/tracks/69XUpOpjzDKcfdxqZebGiI').done(function(response) {
	$.get('https://api.spotify.com/v1/tracks/6P4LHhFkYCudESb5khOizt').done(function(response) {	

		console.log(response);

		//$('audio').attr('src', response.preview_url);

		// Create an <audio> element dynamically.
		//var audio = new Audio();
		//audio.src = 'myfile.mp3';
		//var audio = document.querySelector('audio');
		//audio.src = response.preview_url;
		//audio.controls = true;
		//audio.autoplay = true;
		//document.body.appendChild(audio);

		
		//filter.frequency.value = 5000;
			// Our <audio> element will be the audio source.


			//var source = context.createMediaElementSource(audio);


			bufferLoader = new BufferLoader(
				context, [response.preview_url], function(bufferList) {
					var source = context.createBufferSource();
					source.buffer = bufferList[0];

					source.connect(filter);
					filter.connect(context.destination);
					//source.connect(context.destination);

					source.start(0);
				}
			);

			bufferLoader.load();


			//source.connect(analyser);
			// source.connect(filter);
			// filter.connect(context.destination);

			// console.log('hello', source, context);

			// //source.start(0);

			// audio.play();

		//setTimeout(function() {
			//analyser.connect(context.destination);

			// ...call requestAnimationFrame() and render the analyser's output to canvas.
		//}, false);

		//}, 2000);

		//loadTrack(response.preview_url);

	});

};

/* Track object */

Player.track = function(data, player) {

	this.name = data.name;
	this.artist = data.artists[0].name;
	this.preview = data.preview_url;
	// artist etc

	this.add = function() {

		player.queue.push(this);

	};

	this.remove = function() {

		player.queue.remove(this);
	}
};


// Player.queue = function() {

// 	this.items = [];

// 	this.add = function(track) {

// 		// Add track to queue

// 	};
// }

var bufferLoader;

function loadTrack(track) {

	bufferLoader = new BufferLoader(
		context,
		[track],
		finishedLoading
	);

	bufferLoader.load();

	// context.decodeAudioData(track, function(buffer) {

	//  console.log('buffer', buffer);

	// }, function(error) {
	//  console.log('error', error);
	// });

}


Player.prototype.finishedLoading = function(bufferList) {

	var source = context.createBufferSource();

	source.buffer = bufferList[0];

	source.connect(context.destination);

	source.start(0);
};


Player.prototype.doPlayClick = function() {
	
	// Get the top track.
	var track = this.queue()[0];

	// Inform the parties!
	var partyPages = objectManager.getObjectsOfType('party-page');
	for (var i = 0; i < partyPages.length; i++) {
		partyPages[i].startPlayback(track);
	}

	// Play the track.
	this.play(track);
}


Player.prototype.play = function(track) {
	
	var self = this;

	// Buffer track in queue then play.


	bufferLoader = new BufferLoader(
		self.context, [track.preview], function(bufferList) {

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

			console.log(self.context);

			
		}
	);

	bufferLoader.load();



	// When track is nearly at end, buffer next track.

	// Notify server of next track.


};

Player.prototype.stop = function() {
	

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


