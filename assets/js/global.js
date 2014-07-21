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
var app = angular.module('app', ['ngAnimate']);
app.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});

$(document).ready(function(){
	

	/*
	|
	| MAKE THE PAGER WORK
	|
	*/
	var pager = new Pager('.internal-link', function(fragmentParent){
		//Page change started
	}, function(fragmentParent){
		//Page change successful

		//Start up any new angular objects
		if(app){
			var injector = $('[ng-app]').injector();
			var $compile = injector.get('$compile');
			var $rootScope = injector.get('$rootScope');
			$compile(fragmentParent)($rootScope);
			$rootScope.$digest();
		}

		window.imager.update();
		console.log(window.imager.divs);
		
	}, function(){
		//Page change failed!
	});

	window.imager = new Imager({ lazyload: true, availableWidths: [200, 260, 320, 400, 500, 600] });

});