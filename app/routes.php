<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', [
	'as' => 'home',
	'uses' => 'PartiesController@index'
]);

Route::resource('parties', 'PartiesController');

// Route::get('/', function(){
// 	return View::make('pages.home.chat');
// });


Route::get('/audio', function() {
	return View::make('pages.audio.index');
});

// Route::get('/', function(){
// 	return View::make('pages.styles.index');
// });

Route::get('/trackdetails', function(){
	$artist = Input::get('artist');
	$track = Input::get('title');

	if (empty($artist) || empty($track)){
		return array('response' => array('status' => array('message' => 'error')));
	}
	else{
		return file_get_contents('http://developer.echonest.com/api/v4/song/search?format=json&results=1&limit=true&bucket=id:spotify&bucket=tracks&bucket=audio_summary&api_key=PE0G9IMXXZ27SPSI6&artist=' . urlencode($artist) . '&title=' . urlencode($track));
	}
});
