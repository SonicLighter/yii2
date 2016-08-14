<?php

namespace frontend\assets;

use yii\web\AssetBundle;

/**
 * Main frontend application asset bundle.
 */
class AppAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
        'css/global.css',
        'js/jquery.scrollbar/includes/style.css',
        'js/jquery.scrollbar/includes/prettify/prettify.css',
        'js/jquery.scrollbar/jquery.scrollbar.css',
    ];
    public $js = [
        'js/jquery.scrollbar/includes/prettify/prettify.js',
        'js/jquery.scrollbar/jquery.scrollbar.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
        'yii\bootstrap\BootstrapAsset',
    ];
}
