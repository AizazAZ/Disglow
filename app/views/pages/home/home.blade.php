@extends('templates/master')

@section('meta_title', $pageTitle)
@section('meta_description', $pageDescription)

@section('content')

	@if (Input::get('pagefragment', false) === 'fragment1')

		@include('pages/home/fragments/fragment1')

	@elseif (Input::get('pagefragment', false) === 'fragment2')

		@include('pages/home/fragments/fragment2')

	@else 

	    <h2>This is the home page.</h2>
	    <a href="/" class="internal-link" data-loadfragment="fragment1">Frag 1</a>
	    <a href="/" class="internal-link" data-loadfragment="fragment2">Frag 2</a>
	    <div class="" data-pagefragment="fragment1">
	    	@include('pages/home/fragments/fragment1')
	    </div>


	    <h2>Angular Examples</h2>
	    <div class="test" ng-controller="ExampleController">
			<button ng-click="aFunction()">Click Me!</button>
			<p ng-cloak><% someVariable %></p>

		    <form class="sdf" method="get" action="/" ng-submit="formSubmit($event)">
				<input type="text" name="test" ng-minlength="5"><br/>
				<input type="submit" value="Test">
		    </form>

		</div>


    @endif
@stop

