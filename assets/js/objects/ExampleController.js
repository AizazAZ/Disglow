/*
|
| An example controller which can be used as a base for JS objects
|
*/
app.controller('ExampleController', function($rootScope, $scope) {

	//Set a scope variable
	$scope.someVariable = 'Some Variable';

	//Set a scope function
	$scope.aFunction = function() {
		console.log('Ran the function');
	};
	
	//Listen for an event fired from another controller
	$scope.$on('Retrofuzz.Namespace.EventName', function(event, data) {
		console.log('Reacting to event:', 'Retrofuzz.Namespace.EventName', data);
	});

	//Fire an event for other controllers to react to
	$rootScope.$broadcast('Retrofuzz.Namespace.EventName2');

	//Clean up anything that needs cleaning upon scope destroy
	$scope.$on("$destroy", function() {
		
	});

	//Run other init code here?
	console.log('ExampleController initialised');

});