/*
|
| An example controller which can be used as a base for JS objects
|
*/
window.angularBase.controller('ExampleController', function($rootScope, $scope, $element) {

	//Set a scope variable
	$scope.someVariable = 'Some Variable';

	//Set a scope function
	$scope.aFunction = function() {
		log.info('Ran the function');
	};

	//A function for handling a form submission
	$scope.formSubmit = function(e){
		e.preventDefault();
		log.info('Form submitted using JS');
	};
	
	//Listen for an event fired from another controller
	$scope.$on('Retrofuzz.Namespace.EventName', function(event, data) {
		log.info('Reacting to event:', 'Retrofuzz.Namespace.EventName', data);
	});

	//Fire an event for other controllers to react to
	$rootScope.$broadcast('Retrofuzz.Namespace.EventName2');

	//Clean up anything that needs cleaning upon scope destroy
	$scope.$on("$destroy", function() {
		
	});

	//Run other init code here?
	log.info('ExampleController initialised');

	//You can access the attached DOM element like so
	//However it is VERY discouraged in angular land
	$($element).css('opacity', 0.5);

});