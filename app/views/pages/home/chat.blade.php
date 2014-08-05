@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')

@section('content')

	<ul id="messages"></ul>
	<form action="">
		<input id="m" autocomplete="off" placeholder="Enter Your Nickname" /><button>Send</button>
	</form>

@stop

