window.initScripts = (window.initScripts||{});
initScripts['legacy-object'] = function(element) {

	/***********
	YOU CAN LOOK AT 'element' HERE TO GET ANY CUSTOM 'data-' ATTRIBUTES FROM IT
	THIS ALLOWS YOU TO CREATE INSTANCES OF OBJECTS WITH CUSTOM DATA
	ONCE YOU HAVE THEM IN A VAR YOU CAN STICK THEM IN THE 'object' BELOW
	***********/

	var object = {
		//Type and element are required
		type: "legacy-object",
		element: element,
		//This is a custom interface functions
		makeMeRed: makeMeRed,
		//Destroy here is usually optional but required in some cases as described below
		destroy: destroy
	};

	/***********
	PUT INITIALISATION CODE HERE
	THESE BITS OF INITIALISATION WILL ONLY EVER RUN ONCE FOR EACH OBJECT OF THIS TYPE
	***********/


	//For some reason we want to make all paragraphs display inline when this object initialises
	$(object.element).find('p').each(function(){
		$(this).css('display', 'inline');
	});



	/***********
	PUT INTERFACE FUNCTIONS HERE
	THESE FUNCTIONS CAN BE CALLED MULTIPLE TIMES AND ARE VISIBLE TO OTHER OBJECTS ON THE PAGE
	YOU CAN USE 'this' INSIDE THESE FUNCTIONS TO REFER TO THE 'object' VARIABLE ABOVE
	THESE CAN HAVE PARAMETERS TOO JUST LIKE NORMAL FUNCTIONS
	JUST REMEMBER TO LINK THEM UP IN THE 'object' AT THE TOP
	***********/

	function makeMeRed(){
		$(this.element).css('background-color', 'red');
	}


	function destroy(){
		//IF THE OBJECT NEEDS TO CLEAN ANYTHING UP WHEN BEING REMOVED FROM THE PAGE DO IT HERE
		//VERY IMPORTANT TO REMOVE setInterval() AND $(window).resize/scroll() HANDLERS HERE
	}

	//IF YOU DON'T RETURN 'object' HERE THEN IT WON'T WORK
	return object;

}
