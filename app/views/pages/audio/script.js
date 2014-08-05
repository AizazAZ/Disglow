
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


function searchSpotify(query) {



}


function getSpotifyTrack() {

	

	$.get('https://api.spotify.com/v1/tracks/69XUpOpjzDKcfdxqZebGiI').done(function(response) {

		console.log(response);

		$('audio').attr('src', response.preview_url);

		// Create an <audio> element dynamically.
		//var audio = new Audio();
		//audio.src = 'myfile.mp3';
		var audio = document.querySelector('audio');
		//audio.src = response.preview_url;
		//audio.controls = true;
		//audio.autoplay = true;
		//document.body.appendChild(audio);

		var context = new AudioContext();
		//var analyser = context.createAnalyser();

		// Wait for window.onload to fire. See crbug.com/112368
		//window.addEventListener('load', function(e) {

		var filter = context.createBiquadFilter();
		//filter.type = 0;
		filter.type = 'lowpass';
		//filter.frequency.value = 5000;
			// Our <audio> element will be the audio source.


			var source = context.createMediaElementSource(audio);
			//source.connect(analyser);
			source.connect(filter);
			filter.connect(context.destination);

			console.log('hello', source, context);

			//source.start(0);

			source.start();

		//setTimeout(function() {
			//analyser.connect(context.destination);

			// ...call requestAnimationFrame() and render the analyser's output to canvas.
		//}, false);

		//}, 2000);

		//loadTrack(response.preview_url);

	});

}

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


function finishedLoading(bufferList) {

	var source = context.createBufferSource();

	source.buffer = bufferList[0];

	source.connect(context.destination);

	source.start(0);
}


function player() {


	this.play = function() {


	};


	this.pause = function() {


	}




}



$(function() {

	getSpotifyTrack();
});






/*function BufferLoader(context, urlList, callback) {
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
}*/