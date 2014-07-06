@if (Input::get('pagefragment', false) === false)
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		
		@include('meta/generic')
		{{-- @include('meta/facebook') --}}
		{{-- @include('meta/twitter') --}}
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0">

		<!--[if lte IE 8]>
		<link rel="stylesheet" href="/assets/css/styles-ie.css">
		<![endif]-->
		<!--[if gt IE 8]><!-->
		<link rel="stylesheet" href="/assets/css/styles.css">
		<!--<![endif]-->
		

		<script src="assets/js/vendor/modernizr-2.6.2.min.js"></script>
	</head>
	<body data-pagefragment="body">
		@include('templates/commontop')

@endif

		@yield('content')

@if (Input::get('pagefragment', false) === false)

		@include('templates/commonbottom')

		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="assets/js/script.js"></script>

		<script>
			(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
			function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
			e=o.createElement(i);r=o.getElementsByTagName(i)[0];
			e.src='//www.google-analytics.com/analytics.js';
			r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
			ga('create','UA-XXXXX-X');ga('send','pageview');
		</script>

		<script src="//fuzzdev:35729/livereload.js?snipver=1" async></script>

	</body>
</html>
@endif