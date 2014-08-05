@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')

<div class="section first second">
	<h2>Find a party to join</h2>
<ul class="parties-list">
@foreach ($parties as $party)
	<li class="party-info"><h4>{{ link_to("parties/{$party->slug}", $party->name) }}</h4>
@endforeach
</ul>
</div>