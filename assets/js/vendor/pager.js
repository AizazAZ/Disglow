function Pager(selector, pageChangeCallback, pageChangeErrorCallback) { 

	var parentPager = this;

	this.pageChangeCallback = pageChangeCallback;
	this.pageChangeErrorCallback = pageChangeErrorCallback;
	this.currentAJAX = null;
	this.backFragment = null;
	this.currentStateNum = 0;
	this.justInstantiated = true;
	

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
		console.log('Firing pop', e.originalEvent.state);
		
		if (e.originalEvent.state !== null) {
			if(e.originalEvent.state.isFirst && parentPager.justInstantiated){
				//Pop on forward to home
			}else{
				if(parentPager.currentStateNum > e.originalEvent.state.stateNum){
					console.log('going back');
		    		parentPager.changePage(location.href, {}, parentPager.backFragment, false, e.originalEvent.state.stateNum);
		    		parentPager.backFragment = e.originalEvent.state.fragment;
				}else{
					console.log('going forward');
					parentPager.changePage(location.href, {}, e.originalEvent.state.fragment, false, e.originalEvent.state.stateNum);
					parentPager.backFragment = e.originalEvent.state.fragment;
				}
			}
		    
	    }
		parentPager.justInstantiated = false;
	});

	history.replaceState({fragment:'main-wrapper', stateNum:parentPager.currentStateNum, isFirst:true}, "", window.location);	

} 

Pager.prototype.changePage = function(url, statedata, fragment, performPush, stateId){

	var parentPager = this;

	if(typeof stateId == 'undefined'){
		var stateId = parentPager.currentStateNum+1;
	}

	//If older browser just navigate
	if(!Modernizr.history){
		window.location = url;
		return;
	}

	//Abort any other page changes currently occuring
	if(parentPager.currentAJAX!==null){
		parentPager.currentAJAX.abort();
	}

	var requestURL = url;
	if(requestURL.indexOf('?')!=-1){
		requestURL = requestURL+'&pagefragment='+fragment;
	}else{
		requestURL = requestURL+'?pagefragment='+fragment;
	}

	statedata.fragment = fragment;
	statedata.isFirst = false;
	statedata.stateNum = stateId;

	//Get the URL from the server
	parentPager.currentAJAX = $.get(requestURL).done(function(data){
		//If no errors occured do a push state
		var newPage = parentPager.currentAJAX.getResponseHeader('X-Custom-Page');
		if(typeof newPage != 'undefined'){
			$('body').attr('id', 'page-'+newPage);
		}

		var newTitle = parentPager.currentAJAX.getResponseHeader('X-Custom-Title');
		if(typeof newTitle != 'undefined'){
			document.title = newTitle;
		}

		parentPager.currentAJAX.currentAJAX = null;


		if(performPush){
			console.log('Firing push', statedata, url);
			history.pushState(statedata, "", url);	
		}
		parentPager.currentStateNum = statedata.stateNum;
		
		$('body').find('[data-pagefragment="'+fragment+'"]').html(data);

		parentPager.pageChangeCallback();

	}).fail(function(jqXHR, status){
		if(status!='abort'){
			parentPager.pageChangeErrorCallback();
		}
	}).always(function(){

	});
}