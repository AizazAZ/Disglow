/*
|
| CONSOLE STUB FOR OLD BROWSERS
|
*/
if(!this.console){
	this.console = function(){
		this.log = this.alert = this.info = this.error = function(){};
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

/*
|
| MAKE THE PAGER WORK
|
*/
var pager = new Pager('.internal-link', function(fragmentParent){
	//Page change started
}, function(fragmentParent){
	//Page change successful
	if(app){
		var injector = $('[ng-app]').injector();
		var $compile = injector.get('$compile');
		var $rootScope = injector.get('$rootScope');
		$compile(fragmentParent)($rootScope);
		$rootScope.$digest();
	}
}, function(){
	//Page change failed!
});