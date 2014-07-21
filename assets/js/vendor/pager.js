;(function (window, document) {

    'use strict';

	function Pager(selector, pageChangeBeginCallback, pageChangeCallback, pageChangeErrorCallback) { 

		var parentPager = this;

		this.pageChangeBeginCallback = pageChangeBeginCallback;
		this.pageChangeCallback = pageChangeCallback;
		this.pageChangeErrorCallback = pageChangeErrorCallback;
		this.currentAJAX = null;
		this.backFragment = null;
		this.currentStateNum = 0;
		this.justInstantiated = true;
		this.animations = {};
		

		$('body').on('click', selector, function(e){
			if(!Modernizr.history){
				return;
			}
			e.preventDefault();
			var ajaxURL = $(this).attr('href');
			var fragment = $(this).attr('data-loadfragment');
			var doPush = $(this).attr('data-vetopush')===undefined;
			var animation = $(this).attr('data-animation')||false;
			if(typeof fragment == 'undefined'){
				fragment = 'main-wrapper';
			}
			parentPager.backFragment = fragment;
			if(typeof ajaxURL == 'undefined'){
				return false;
			}else{
				parentPager.changePage(ajaxURL, {}, fragment, doPush, false, animation);
			}
		});

		//Bind to popstate here
		$(window).on("popstate", function(e) {
			log.info('Firing pop', e.originalEvent.state);
			
			if (e.originalEvent.state !== null) {
				if(e.originalEvent.state.isFirst && parentPager.justInstantiated){
					//Pop on forward to home
				}else{
					if(parentPager.currentStateNum > e.originalEvent.state.stateNum){
						log.info('going back');
			    		parentPager.changePage(location.href, {}, parentPager.backFragment, false, e.originalEvent.state.stateNum);
			    		parentPager.backFragment = e.originalEvent.state.fragment;
					}else{
						log.info('going forward');
						parentPager.changePage(location.href, {}, e.originalEvent.state.fragment, false, e.originalEvent.state.stateNum);
						parentPager.backFragment = e.originalEvent.state.fragment;
					}
				}
			    
		    }
			parentPager.justInstantiated = false;
		});

		history.replaceState({fragment:'main-wrapper', stateNum:parentPager.currentStateNum, isFirst:true}, "", window.location);	

	} 

	Pager.prototype.setAnimations = function(obj){
		this.animations = obj;
	}

	Pager.prototype.changePage = function(url, statedata, fragment, performPush, stateId, animation){

		var parentPager = this;

		if(typeof stateId == 'undefined' || stateId === false){
			var stateId = parentPager.currentStateNum+1;
		}

		if(typeof animation == 'undefined' || animation === false){
			var animation = 'swap';
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

		var toUpdate = $('body').find('[data-pagefragment="'+fragment+'"]');
		if(toUpdate.size()==0){
			log.error('Invalid fragment name provided');
			return;
		}
		parentPager.pageChangeBeginCallback(toUpdate.get(0));

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
				log.info('Firing push', statedata, url);
				history.pushState(statedata, "", url);
			}
			parentPager.currentStateNum = statedata.stateNum;
			
			if(parentPager.animations.hasOwnProperty(animation)) {
				log.info('Using animation: '+animation);
				parentPager.animations[animation](toUpdate, data, function(){
					parentPager.pageChangeCallback(toUpdate.get(0));
				});
			}else{
				log.info('No animation set');
				toUpdate.html(data);
				parentPager.pageChangeCallback(toUpdate.get(0));
			}


		}).fail(function(jqXHR, status){
			if(status!='abort'){
				parentPager.pageChangeErrorCallback();
			}
		}).always(function(){

		});
	}

    /* global module, exports: true, define */
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS, just export
        module.exports = exports = Pager;
    } else if (typeof define === 'function' && define.amd) {
        // AMD support
        define(function () { return Pager; });
    } else if (typeof window === 'object') {
        // If no AMD and we are in the browser, attach to window
        window.Pager = Pager;
    }
    /* global -module, -exports, -define */

}(window, document));