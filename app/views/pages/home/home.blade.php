{{-- If a page fragment is requested - use an empty master layout --}}

@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')

@section('content')

	&#9786;

@stop

