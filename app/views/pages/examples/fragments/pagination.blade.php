@foreach ($examples as $example)
	<p style="float:left; margin-right:5px;">
	{{ link_to_route('exampleItem', $example->name, array($example->name), array(
		'class' => 'internal-link', 
		'data-loadfragment' => 'fragment1',
		'data-animation' => 'fade'
		)) 
	}}
	</p>
@endforeach

<div style="clear:both;">
{{ with(new \Retrofuzz\Pagination\FragmentPaginationLinks($examples, 'paginationFragment'))->render(); }}
</div>