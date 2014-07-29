<?php

/*
|--------------------------------------------------------------------------
| Register The Laravel Class Loader
|--------------------------------------------------------------------------
|
| In addition to using Composer, you may use the Laravel class loader to
| load your controllers and models. This is useful for keeping all of
| your classes in the "global" namespace without Composer updating.
|
*/

ClassLoader::addDirectories(array(

	app_path().'/commands',
	app_path().'/controllers',
	app_path().'/models',
	app_path().'/database/seeds',

));

/*
|--------------------------------------------------------------------------
| Application Error Logger
|--------------------------------------------------------------------------
|
| Here we will configure the error logger setup for the application which
| is built on top of the wonderful Monolog library. By default we will
| build a basic log file setup which creates a single file for logs.
|
*/

Log::useFiles(storage_path().'/logs/laravel.log');

/*
| Only send logs to slack from the production environment
*/
if(App::environment()=='production'){
	$monolog = Log::getMonolog();
	$slackHandler = new Retrofuzz\ErrorHandlers\SlackHandler('xoxp-2245945673-2410320785-2468152940-d59f51','C02DR3TLK',Config::get('app.url'));
	$monolog->pushHandler($slackHandler);
}

/*
| Only log SQL queries in dev mode
*/
if(Config::get('app.debug')){
	Event::listen('illuminate.query', function($query){
		Log::info($query);
	});
}

/*
|--------------------------------------------------------------------------
| Application Error Handler
|--------------------------------------------------------------------------
|
| Here you may handle any errors that occur in your application, including
| logging them or displaying custom views for specific errors. You may
| even register several error handlers to handle different types of
| exceptions. If nothing is returned, the default error view is
| shown, which includes a detailed stack trace during debug.
|
*/

App::error(function(Exception $exception, $code)
{
	Log::error($exception);
	if(App::environment()=='production'){
		return Response::view('other.error', array(), 500);
	}
});

App::fatal(function($exception)
{
	Log::critical($exception); 
	if(App::environment()=='production'){
		return Response::view('other.error', array(), 500);
	}
});



App::missing(function($exception)
{
    return Response::view('other.fourohfour', array(), 404);
});


/*
|--------------------------------------------------------------------------
| Maintenance Mode Handler
|--------------------------------------------------------------------------
|
| The "down" Artisan command gives you the ability to put an application
| into maintenance mode. Here, you will define what is displayed back
| to the user if maintenance mode is in effect for the application.
|
*/

App::down(function()
{
	return Response::view('other.maintenance', array(), 503);
});

/*
|--------------------------------------------------------------------------
| Require The Filters File
|--------------------------------------------------------------------------
|
| Next we will load the filters file for the application. This gives us
| a nice separate location to store our route and application filter
| definitions instead of putting them all in the main routes file.
|
*/

require app_path().'/filters.php';
