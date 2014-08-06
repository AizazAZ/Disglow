@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')

@section('content')


<header>

<div id="container">
<div class="header">
	<a href="/"><img src="{{ cdn('images/logo.png') }}" class="logo"></a>

	<ul class="login">
		<li><a href="/">Login</a></li>
		<li><a href="/">Register</a></li>
	</ul>


</div>

</header>


<div class="section first second">
	<h2>Find a party to join</h2>
<ul class="parties-list">
@foreach ($parties as $party)
	<li class="party-info"><h4>{{ link_to("parties/{$party->slug}", $party->name) }}</h4>
@endforeach


</ul>
</div>
@stop