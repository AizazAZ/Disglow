var app = angular.module('app', ['ngAnimate']);

// Change your angular specific tags from the standard configuration so it doesn't clash with blade templating!!!!!!!!!!!!!!!!!!!!!!!
app.config(function($interpolateProvider) {

	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');

});


app.controller('TestController', function($rootScope, $scope) {

	$scope.swear = function() {

		$scope.swearwords = [
			'Piss',
			'Fuck',
			'Minge',
			'Bumhole'
		];

		$scope.swearword = $scope.swearwords[Math.floor(Math.random() * $scope.swearwords.length)];
		
			$rootScope.$broadcast('fuzz.clicks.hello', $scope.swearword);
		
	};
	
	$scope.$on('fuzz.clicks.remoteswear', function(event, msg) {
		$scope.swear();
	});

});

app.controller('TestControllerB', function($rootScope, $scope) {

	$scope.output = 'Ready';

	$scope.$on('fuzz.clicks.hello', function(event, msg) {

	    $scope.output = msg;

	  });


	$scope.remoteSwear = function(){

		$rootScope.$broadcast('fuzz.clicks.remoteswear');

	}


});

