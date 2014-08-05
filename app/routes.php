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
