<?php

use Illuminate\Support\Str;
use Cviebrock\EloquentSluggable\SluggableInterface;
use Cviebrock\EloquentSluggable\SluggableTrait;

class Party extends Eloquent implements SluggableInterface{

	use SluggableTrait;

    protected $sluggable = array(
        'build_from' => 'name',
        'save_to'    => 'slug',
    );

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'parties';

	// public function save(array $options = array())
	// {
	// 	$this->attributes['slug'] = Str::slug($this->attributes['name']);
	// 	parent::save();
	// }

}
