<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'authManager' => [
            'class' => 'yii\rbac\DbManager',
        ],
        'formatter' => [
           'dateFormat' => 'd.MM.yyyy',
           'timeFormat' => 'H:mm:ss',
           'datetimeFormat' => 'd.MM.yyyy H:mm',
        ],
    ],
];
