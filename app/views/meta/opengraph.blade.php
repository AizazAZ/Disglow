
@if(isset($og_title))
	<meta property="og:title" content="{{ $og_title }}"/>
@endif
@if(isset($og_description))
	<meta property="og:description" content="{{ $og_description }}"/>
@endif
@if(isset($og_type))
	<meta property="og:type" content="{{ $og_type }}" />
@endif
@if(isset($og_image))
	<meta property="og:image" content="{{ $og_image }}" />
@endif
@if(isset($og_url))
	<meta property="og:url" content="{{ $og_url }}" />
@endif
@if(isset($og_site))
	<meta property="og:site_name" content="{{ $og_site }}"/>
@endif