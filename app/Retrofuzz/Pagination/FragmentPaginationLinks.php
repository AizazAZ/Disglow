<?php namespace Retrofuzz\Pagination;

use Illuminate\Pagination\Presenter;

class FragmentPaginationLinks extends Presenter {

    protected $fragmentName;

    public function __construct($paginator, $fragmentName){
        parent::__construct($paginator);
        $this->fragmentName = $fragmentName;   
    }

    public function getActivePageWrapper($text)
    {
        return '<li class="current">'.$text.'</li>';
    }

    public function getDisabledTextWrapper($text)
    {
        return '<li class="unavailable">'.$text.'</li>';
    }

    public function getPageLinkWrapper($url, $page, $rel = NULL)
    {
        return '<li><a class="internal-link" data-vetopush data-loadfragment="'.$this->fragmentName.'"  href="'.$url.'">'.$page.'</a></li>';
    }

}