<?php
return [
    'vendorPath' => dirname(dirname(__DIR__)) . '/vendor',
    'components' => [
         'mail' => [
             'class' => 'yii\swiftmailer\Mailer',
             'transport' => [
                 'class' => 'Swift_SmtpTransport',
                 'host' => 'smtp.gmail.com',  // e.g. smtp.mandrillapp.com or smtp.gmail.com
                 'username' => 'pashkevich.s.d@gmail.com',
                 'password' => '310119952020327Sonic',
                 'port' => '587', // Port 25 is a very common port too
                 'encryption' => 'tls', // It is often used, check your provider or mail server specs
             ],
         ],
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
    'aliases' => [
          '@profilePictures' => '/frontend/web/images/profile/',
          '@noAvatar' => '/frontend/web/images/default/no-avatar.jpg',
     ],
];
