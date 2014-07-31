
@if(isset($tw_type))
	<meta name="twitter:card" content="{{ $tw_type }}">
@endif
@if(isset($tw_user))
	<meta name="twitter:site" content="{{ '@'.$tw_user }}">
@endif
@if(isset($tw_creator))
	<meta name="twitter:creator" content="{{ '@'.$tw_creator }}">
@endif
@if(isset($tw_title))
	<meta name="twitter:title" content="{{ $tw_title }}">
@endif
@if(isset($tw_description))
	<meta name="twitter:description" content="{{ $tw_description }}">
@endif
@if(isset($tw_image))
	<meta name="twitter:image:src" content="{{ $tw_image }}">
@endif
