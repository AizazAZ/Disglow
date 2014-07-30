{{-- If a page fragment is requested - use an empty master layout --}}

@extends(Input::get('pagefragment', false) === false?'templates.master':'templates.ajax')



@section('meta_additional')
	@include('meta.opengraph', array(
		'og_title'=>'title', 
		'og_description'=>'description', 
		'og_type'=>'article',
		'og_image'=>'https://www.google.co.uk/images/srpr/logo11w.png',
		'og_url'=>URL::to('/'),
		'og_site'=>'Site Name'
		))

	@include('meta.twitter', array(
		'tw_type'=>'summary_large_image', 
		'tw_user'=>'slice_beans', 
		//'tw_creator'=>'article',
		'tw_title'=>'title',
		'tw_description'=>'description',
		'tw_image'=>'https://www.google.co.uk/images/srpr/logo11w.png'
		))
@stop



@section('content')

	&#9786;

@stop

