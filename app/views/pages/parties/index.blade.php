@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')

<ul class="parties-list">
@foreach ($parties as $party)
	<li>{{ link_to("parties/{$party->slug}", $party->name) }}
@endforeach
</ul>