{{-- If a page fragment is requested - use an empty master layout --}}

@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')

@section('content')

	<h1 style="text-align:center;">404</h1>

@stop