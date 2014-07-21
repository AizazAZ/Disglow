<?php

class PagesController extends BaseController{

	public $resp;

	public function __construct(Response $resp){
		$this->resp = $resp;
	}

	public function home(){

		$pageTitle = 'Home Page Title';
		$pageDescription = 'This is a description of the home page';
		$pageName = 'home';

		$users = DB::table('test')->paginate(5);

		$response = Response::view('pages/home/home', [
			'pageTitle' => $pageTitle,
			'pageDescription' => $pageDescription,
			'pageName' => $pageName,
			'users' => $users
			], 200, [
			'X-Custom-Page' => $pageName,
			'X-Custom-Title' => $pageTitle
			]);

		return $response;
	}

}