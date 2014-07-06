function Pager(selector, pageChangeCallback, pageChangeErrorCallback) { 

	var parentPager = this;

	this.pageChangeCallback = pageChangeCallback;
	this.pageChangeErrorCallback = pageChangeErrorCallback;
	this.currentAJAX = null;
	this.backFragment = null;
	this.currentStateNum = 0;
	

	$('body').on('click', selector, function(e){
		if(!Modernizr.history){
			return;
		}
		e.preventDefault();
		var ajaxURL = $(this).attr('href');
		var fragment = $(this).attr('data-loadfragment');
		if(typeof fragment == 'undefined'){
			fragment = 'main-wrapper';
		}
		parentPager.backFragment = fragment;
		if(typeof ajaxURL == 'undefined'){
			return false;
		}else{
			parentPager.changePage(ajaxURL, {}, fragment, true);
		}
	});

	//Bind to popstate here
	$(window).on("popstate", function(e) {
		console.log('Firing pop', e.originalEvent);
		//FIXME: NEED TO FIND A WAY TO DETECT FIRST PAGE LOAD NOW BECAUSE STATE IS NO LONGER NULL
		if (e.originalEvent.state !== null) {
			//console.log(e.originalEvent.state);
	    	parentPager.changePage(location.href, {}, parentPager.backFragment, false);
	    	parentPager.backFragment = e.originalEvent.state.fragment;
	    }
	});

	history.replaceState({fragment:'main-wrapper', stateNum:parentPager.currentStateNum}, "", window.location);	

} 

Pager.prototype.changePage = function(url, statedata, fragment, performPush){

	var parentPager = this;

	//If older browser just navigate
	if(!Modernizr.history){
		window.location = url;
		return;
	}

	//Abort any other page changes currently occuring
	if(this.currentAJAX!==null){
		this.currentAJAX.abort();
	}

	var requestURL = url;
	if(requestURL.indexOf('?')!=-1){
		requestURL = requestURL+'&pagefragment='+fragment;
	}else{
		requestURL = requestURL+'?pagefragment='+fragment;
	}

	statedata.fragment = fragment;
	//statedata.stateNum = parentPager.currentStateNum+1;

	//Get the URL from the server
	this.currentAJAX = $.get(requestURL).done(function(data){
		//If no errors occured do a push state
		this.currentAJAX = null;

		if(performPush){
			console.log('Firing push', statedata, url);
			history.pushState(statedata, "", url);	
			//parentPager.currentStateNum = statedata.stateNum;
		}
		
		$('body').find('[data-pagefragment="'+fragment+'"]').html(data);

		parentPager.pageChangeCallback();

	}).fail(function(jqXHR, status){
		if(status!='abort'){
			parentPager.pageChangeErrorCallback();
		}
	}).always(function(){

	});
}