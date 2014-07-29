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
| BOOT ANGULAR
|
*/
var app = angular.module('app', ['ngAnimate', 'ngTouch']);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});

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
		//Page change started
		log.info('Page change started');

	}, function(fragmentParent){
		//Page change successful
		log.info('Page change success');

		//Start up any new angular objects
		if(app){
			var injector = $('[ng-app]').injector();
			var $compile = injector.get('$compile');
			var $rootScope = injector.get('$rootScope');
			$compile(fragmentParent)($rootScope);
			$rootScope.$digest();
		}

		//Sort any new legacy objects
		objectManager.initObjects(fragmentParent);
		
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