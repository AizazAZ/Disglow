@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')

<div class="party-page" data-slug="{{ $party->slug }}">
	<h1>{{ $party->name }}</h1>
</div>