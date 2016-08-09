<?php
use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use bluezed\scrollTop\ScrollTop;
?>

    <?= ScrollTop::widget() ?>
    <?php
    NavBar::begin([
        'brandLabel' => 'SOCIALNETWORK.COM',
        'brandUrl' => (Yii::$app->user->isGuest)?(Yii::$app->homeUrl):(Url::toRoute(['profile/index', 'id' => Yii::$app->user->id])),
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);



    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'encodeLabels' => false,
        'items' => [
             [
                  'label' => '<span class="glyphicon glyphicon-home"></span> &nbsp My Profile',
                  'url' => ['profile/index', 'id' => Yii::$app->user->id],
                  'visible' => !Yii::$app->user->isGuest,
                  'options' => ['class' => 'visible-xs'],
             ],
             [
                  'label' => '<span class="glyphicon glyphicon-search"></span> &nbsp Search',
                  'url' => ['/profile/search'],
                  'visible' => !Yii::$app->user->isGuest,
                  'options' => ['class' => 'visible-xs'],
             ],
             [
                  'label' => '<span class="glyphicon glyphicon-envelope"></span> &nbsp Messages',
                  'url' => ['messages/index'],
                  'visible' => !Yii::$app->user->isGuest,
                  'options' => ['class' => 'visible-xs'],
             ],
             [
                  'label' => '<span class="glyphicon glyphicon-user"></span> &nbsp My Friends',
                  'url' => ['profile/friends'],
                  'visible' => !Yii::$app->user->isGuest,
                  'options' => ['class' => 'visible-xs'],
             ],
             [
                  'label' => '<span class="glyphicon glyphicon-time"></span> &nbsp New Friends',
                  'url' => ['profile/waiting'],
                  'visible' => !Yii::$app->user->isGuest,
                  'options' => ['class' => 'visible-xs'],
             ],
             [
                  'label' => '<span class="glyphicon glyphicon-star"></span> &nbsp My Requests',
                  'url' => ['profile/requests'],
                  'visible' => !Yii::$app->user->isGuest,
                  'options' => ['class' => 'visible-xs'],
             ],
             [
                  'label' => '<span class="glyphicon glyphicon-cog"></span> &nbsp Settings',
                  'url' => ['profile/edit'],
                  'visible' => !Yii::$app->user->isGuest,
                  'options' => ['class' => 'visible-xs'],
             ],
             [
                  'label' => '<span class="glyphicon glyphicon-tower"></span> &nbsp Games',
                  'url' => ['games/index'],
                  'visible' => !Yii::$app->user->isGuest,
                  'options' => ['class' => 'visible-xs'],
             ],
            Yii::$app->user->isGuest ? (
                ['label' => 'Login', 'url' => ['/site/login']]
            ) : (
                [
                     'label' => Yii::$app->user->identity->username,
                     'items' => [
                         [
                               'label' => 'AdminPanel',
                               'url' => ['/admin'],
                               'visible' =>  Yii::$app->user->can("openUsers"),
                               'class' => 'navbar-btn',
                         ],
                         ['label' => 'Logout (' . Yii::$app->user->identity->email . ')', 'url' => '/site/logout'],
                     ],
                ]
            )
        ],
    ]);

    NavBar::end();
    ?>
