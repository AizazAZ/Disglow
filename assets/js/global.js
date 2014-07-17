var pager = new Pager('.internal-link', function(fragmentParent){
	if(app){
		var injector = $('[ng-app]').injector();
		var $compile = injector.get('$compile');
		var $rootScope = injector.get('$rootScope');
		$compile(fragmentParent)($rootScope);
		$rootScope.$digest();
	}
}, function(){});