@foreach ($users as $user)
	<p>{{ $user->name }}</p>
@endforeach

{{ with(new \Retrofuzz\Pagination\FragmentPaginationLinks($users, 'paginationFragment'))->render(); }}