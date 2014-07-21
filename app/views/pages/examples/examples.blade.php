{{-- If a page fragment is requested - use an empty master layout --}}

@extends(Input::get('pagefragment', false) === false?'templates/master':'templates/ajax')

@section('meta_title', $pageTitle)
@section('meta_description', $pageDescription)

@section('content')

	@if (Input::get('pagefragment', false) === 'paginationFragment')

		@include('pages/examples/fragments/pagination')

	@elseif (Input::get('pagefragment', false) === 'fragment1')

		@include('pages/examples/fragments/fragment1')

	@elseif (Input::get('pagefragment', false) === 'fragment2')

		@include('pages/examples/fragments/fragment2')

	@else 

		<div class="pagination-holder" data-pagefragment="paginationFragment" style="float:right;width:200px;">
			@include('pages/examples/fragments/pagination')
		</div>

	    <h2>This is the examples page.</h2>
	    <a href="/" class="internal-link" data-loadfragment="fragment1">Frag 1</a>
	    <a href="/somepage" class="internal-link" data-loadfragment="fragment2">Frag 2</a>
	    <div class="" data-pagefragment="fragment1">
	    	@include('pages/examples/fragments/fragment1')
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

		<h2>Imager.js Examples</h2>

		<div style="width:300px;height:300px;background-size:cover;" class="delayed-image-load" data-src="http://placehold.it/{width}" data-bgmode="true" data-alt="alternative text"></div> 



    @endif
@stop
