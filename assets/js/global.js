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