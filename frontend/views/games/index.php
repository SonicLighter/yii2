<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\widgets\LinkPager;
use yii\grid\GridView;
use yii\bootstrap\ActiveForm;
use yii\widgets\ListView;
use yii\grid\DataColumn;
use yii\grid\ActionColumn;
use yii\helpers\HtmlPurifier;
use yii\helpers\Url;
use \kop\y2sp\ScrollPager;

$this->title = 'Games';

?>

<div class='profile-right_item'>
     <div class='profile-right_item-username'>
          <?= Html::encode($this->title); ?>
     </div>
     <div class='profile-right_item-active'>
     </div>
     <br/>
     <hr/>
     Choose the game and enjoy!
</div><br/>
<div class='profile-right_item-news'>
     <div class='profile-right_item-newstitle'>
          2048
     </div>
     <div class='profile-right_item-active'>
     </div><br/><hr/>
     2048 — браузерная игра, написанная 19-летним итальянским разработчиком Габриэле Чирулли (итал. Gabriele Cirulli) на языке программирования JavaScript. Игровое поле имеет форму квадрата 4x4. Целью игры является получение плитки номинала «2048» (при желании можно продолжить дальше).
     <hr/>
     <div class='profile-right_item-newsdate'>
          &nbsp;
     </div>
     <div class='profile-right_item-newscomments'>
          <?= Html::a('Play', [Url::toRoute(['games/game'])]); ?>
     </div><br/>
</div>
