;(function (window, document) {

    'use strict';

	function ObjectManager() { 

		var objMan = this;

		this.initScripts = (window.initScripts||{});
		this.activeObjects = [];

	}

	ObjectManager.prototype.initObjects = function(filter) {
		var objMan = this;
		objMan.checkObjects(); //Might not be needed here but doesn't hurt for now
		if(typeof filter === 'undefined') {
			var filter = '';
		}
		$(filter + ' [data-init]').each(function() {
			var toRun = $(this).attr('data-init');
			if($(this).hasClass('instantiated-'+toRun)){
				return;
			}
			log.info('ObjectManager: Instantiating object: '+toRun);
			if(typeof objMan.initScripts[toRun] !== 'undefined'){
				objMan.activeObjects.push(objMan.initScripts[toRun](this));
			}else{
				log.error('ObjectManager:ERROR: Attempt to instantiate unsupported object: '+toRun);
			}
			$(this).addClass('instantiated-'+toRun);
		});
	}

	ObjectManager.prototype.checkObjects = function() {
		var objMan = this;
		var removed = true;
		while(removed){
			removed = false;
			for(var i = 0; i < this.activeObjects.length; i++) {
				var object = objMan.activeObjects[i];
				if(!$.contains(window.document, object.element)) {
					removed = true;
					if(object.destroy){
						object.destroy();
					}
					objMan.activeObjects.splice(i, 1);
					break;
				}
			}
		}
	}

	ObjectManager.prototype.getObjectsOfType = function(type){
		var objMan = this;
		var ret = [];
		var i;
		for (i = 0; i < objMan.activeObjects.length; ++i) {
			if(objMan.activeObjects[i].type==type){
				ret.push(objMan.activeObjects[i]);
			}
		}
		return ret;
	}

	ObjectManager.prototype.getObjectByElement = function(element){
		var objMan = this;
		var ret = [];
		var i;
		for (i = 0; i < objMan.activeObjects.length; ++i) {
			if($(objMan.activeObjects[i].element).is($(element))){
				ret.push(objMan.activeObjects[i]);
			}
		}
		return ret;
	}

    /* global module, exports: true, define */
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS, just export
        module.exports = exports = ObjectManager;
    } else if (typeof define === 'function' && define.amd) {
        // AMD support
        define(function () { return ObjectManager; });
    } else if (typeof window === 'object') {
        // If no AMD and we are in the browser, attach to window
        window.ObjectManager = ObjectManager;
    }
    /* global -module, -exports, -define */

}(window, document));