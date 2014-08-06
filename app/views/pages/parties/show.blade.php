@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')

@section('content')

<div class="header-playback">
	<a href="/"><img src="{{ cdn('images/logo_lightbg.png') }}" class="logo"></a>

	
</div>

<div class="party-page" data-init="party-page" data-slug="{{ $party->slug }}">
	
<div class="section first-playback">

	<h1>{{ $party->name }}</h1>
</div>

<div class="section second">
	<div data-init="player" class="dj-only">
		
		<div class="search-section">

			<h2>Search for a track</h2>




			<input type="text" id="search-query" data-bind="value: query, valueUpdate: 'afterkeydown'">

			<div class="search-results" data-bind="foreach: tracks">

				<div class="track">
					<div class="button"><a href="#" data-bind="click: add">Add track</a></div>
					<span class="name" data-bind="text: name"></span>
				</div>

			</div>
		</div>

		<div class="queue-section">
			
			<h2>Play Queue</h2>

			<div class="button play"><a href="#" data-bind="click: doPlayClick"><img src="{{ cdn('images/playing.gif') }}" class="playing">Play</a></div>

<button id="login" class="btn btn-primary">Save Playlist</button>
			<div data-bind="foreach: queue">
				
				<div class="track">
					<div class="button"><a href="#" data-bind="click: remove">Remove track</a></div>
					<span class="name" data-bind="text: name"></span>
				</div>
				
			</div>
			
		</div>

</div>


</div>

<div class="section third">
	<a href="" class="button play">Choose another party</a>
		
	</div>


@stop

