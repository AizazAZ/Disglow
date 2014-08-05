<?php

class PartiesTableSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Party::truncate();
		Party::create([
			'name' => 'Dance Your Pants Off',
			'type' => 1,
			'active' => 1
		]);

		Party::create([
			'name' => 'D.I.S.C.O.',
			'type' => 1,
			'active' => 1
		]);

		Party::create([
			'name' => 'Dancé',
			'type' => 1,
			'active' => 1
		]);

		Party::create([
			'name' => 'Dance',
			'type' => 1,
			'active' => 1
		]);

	}

}
