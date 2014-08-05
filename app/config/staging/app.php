<?php

$path = explode('/',__DIR__);
array_pop($path);
array_pop($path);
array_pop($path);
$folder = $path[sizeof($path)-1];
return array(

	/*
	|--------------------------------------------------------------------------
	| Application Debug Mode
	|--------------------------------------------------------------------------
	|
	| When your application is in debug mode, detailed error messages with
	| stack traces will be shown on every error that occurs within your
	| application. If disabled, a simple generic error page is shown.
	|
	*/

	'debug' => false,
	
	'url' => 'http://'.$folder.'.rtrfz.com',

	'cdn' => array(
		//"cdn.umg3.net/artistsite/" => "" //UMG weird cdn
		//"cdn.websitename.com/assets/" => "" //A normal cdn, assets should match assets_folder above
	),

);
