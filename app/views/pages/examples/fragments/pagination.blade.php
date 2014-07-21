@foreach ($examples as $example)
	<p>{{ link_to_route('exampleItem', $example->name, array($example->name), array('class' => 'internal-link', 'data-loadfragment' => 'fragment1')) }}</p>
@endforeach

{{ with(new \Retrofuzz\Pagination\FragmentPaginationLinks($examples, 'paginationFragment'))->render(); }}