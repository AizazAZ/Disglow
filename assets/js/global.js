/*
|
| CONSOLE STUB FOR OLD BROWSERS
|
*/
if(!this.console){
	this.console = function(){
		this.log = this.alert = this.info = this.error = this.debug = function(){};
	}
}

/*
|
| BOOT ANGULAR IF IT EXISTS
|
*/
if(typeof angular !== 'undefined'){
	window.angularBase = angular.module('angularBase', ['ngAnimate', 'ngTouch']);
	window.angularBase.config(function($interpolateProvider) {
		$interpolateProvider.startSymbol('<%');
		$interpolateProvider.endSymbol('%>');
	});
}

// CONSTANTS
var EVENT_JOIN_PARTY = 'party.join';
var EVENT_DJ_POLL = 'dj.poll';
var EVENT_DJ_SWITCH = 'dj.switch';
var EVENT_DJ_ASSIGN = 'dj.assign';
var EVENT_LISTENER_SYNC = 'listener.sync';
var EVENT_LISTENER_SWITCH = 'listener.switch';
var POLL_INTERVAL = 1000;
var VISUALISER_INTERVAL = 1000;
var COLOUR_FLUCTUATION = 0.05;

var baseUrl = window.location.protocol + '//' + window.location.hostname;
var socket = io.connect(baseUrl + ':3000');

$(document).ready(function(){

	/*
	|
	| MAKE OBJECT MANAGER WORK FOR LEGACY OBJECTS
	|
	*/
	window.objectManager = new ObjectManager();
	objectManager.initObjects();

	/*
	|
	| MAKE THE PAGER WORK
	|
	*/
	var pager = new Pager('.internal-link', function(fragmentParent){
		log.info('Page change started');

	}, function(fragmentParent){
		log.info('Page change success');

		//Start up any new angular objects
		if(window.angularBase){
			var injector = $('[ng-app]').injector();
			var $compile = injector.get('$compile');
			var $rootScope = injector.get('$rootScope');
			$compile(fragmentParent)($rootScope);
			$rootScope.$digest();
		}

		//Sort any new legacy objects
		if(window.objectManager){
			objectManager.initObjects(fragmentParent);
		}
		
	}, function(){
		//Page change failed!
		log.warn('Page change failed');

	});

	pager.setAnimations({
		'fade' : function(container, newContent, callback){
			$(container).fadeTo(300, 0, function(){
				$(container).html(newContent).fadeTo(300, 1);
			})
		}
	});

});

function getRequestObject(){
	return {
		time: getCurrentTime()
	}
}

function isValidTrack(track){
	return typeof track != 'undefined';
}

function postMessage(msg, username){
    var li = $('<li>').text(msg);
    if (typeof username != 'undefined'){
        li.prepend('<span class="username">' + username + '</span>: ');
    }
    $('#messages').append(li);
}

function getCurrentTime(){
	return new Date().getTime();
}


// Colour functions
function randomHexColour(){
	return 'rgb(' + random255() + ', ' + random255() + ', ' + random255() + ')';
}

function colourToHex(colour) {
    if (colour.substr(0, 1) === '#') {
        return colour;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(colour);

    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);

    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
}

function random255(){
	return Math.floor(Math.random() * 255);
}

function colourLuminance(hex, lum) {

	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;

	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}

	return rgb;
}