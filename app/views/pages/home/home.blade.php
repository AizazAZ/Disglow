@extends('templates/master')

@section('meta')
	<title>A Title - HOME</title>
    <meta name="description" content="A Description - HOME">
    <meta name="keywords" content="home,keywords">
@stop

@section('content')
	@if (Input::get('pagefragment', false) === 'fragment1')
		@include('pages/home/fragments/fragment1')
	@elseif (Input::get('pagefragment', false) === 'fragment2')
		@include('pages/home/fragments/fragment2')
	@else 
	    <p>This is the home page.</p>
	    <a href="/" class="internal-link" data-loadfragment="fragment1">Frag 1</a>
	    <a href="/" class="internal-link" data-loadfragment="fragment2">Frag 2</a>
	    <div class="" data-pagefragment="fragment1">
	    	@include('pages/home/fragments/fragment1')
	    </div>
    @endif
@stop