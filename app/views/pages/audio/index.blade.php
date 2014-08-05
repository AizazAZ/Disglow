@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')


@section('content')

<div data-init="player">
	
	<h1>Hi</h1>

	<div style="width: 50%; float: left">

		<h2>Search for a track</h2>


		<input type="text" id="search-query" data-bind="value: query, valueUpdate: 'afterkeydown'">

		<div class="search-results" data-bind="foreach: tracks">

			<div class="track">
				<a href="#" data-bind="click: add">Add track</a>
				<span class="name" data-bind="text: name"></span>
			</div>

		</div>
	</div>

	<div style="width: 50%; float: right;">
		
		<h2>Play Queue</h2>

		<a href="#" data-bind="click: play">Play</a>

		<div data-bind="foreach: queue">
			
			<div class="track">
				<a href="#" data-bind="click: remove">Remove track</a>
				<span class="name" data-bind="text: name"></span>
			</div>
			
		</div>
		
	</div>






	
</div>


@stop
