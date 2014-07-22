<?php

class PagesController extends BaseController{

	public $resp;

	public function __construct(Response $resp){
		$this->resp = $resp;
	}

	public function examples($name = false){

		$pageTitle = $name.' Example Page Title';
		$pageDescription = 'This is a description of the example page';
		$pageName = 'examples';

		if($name!==false){
			$firstExample = Example::where('name', '=', $name)->first();
		} else {
			$firstExample = Example::all()->first();
		}

		$examples = Example::paginate(5);

		$response = Response::view('pages/examples/examples', [
			'pageTitle' => $pageTitle,
			'pageDescription' => $pageDescription,
			'pageName' => $pageName,
			'examples' => $examples,
			'firstExample' => $firstExample
			], 200, [
			'X-Custom-Page' => $pageName,
			'X-Custom-Title' => $pageTitle
			]);

		return $response;
	}


}