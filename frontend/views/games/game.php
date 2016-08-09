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

$this->title = '2048';
Yii::$app->view->registerJsFile('../game/game.js', ['depends' => [\yii\web\JqueryAsset::className()]]);
$this->registerCssFile('../game/game.css');
?>

<div class='profile-right_item'>
     <div class='profile-right_item-username'>
          <?= Html::encode($this->title); ?>
     </div>
     <div class='profile-right_item-active'>
     </div>
     <br/>
     <hr/>
     <div style='width: 500px; margin: auto;'>
          <div style='width:50%; float:left'>
               <?= Html::button('New game',['class' => 'game-container-results-button', 'id' => 'newGameButton']) ?>
          </div>
          <div style='width:50%;float:left; text-align:right;'>
               <h4> <div id='gameScore' class='game-container-results'> <div class='game-container-results-title'>score</div><div class='game-container-results-value'> 0</div> </div><div id='gameBest' class='game-container-results'> <div class='game-container-results-title'>best</div><div class='game-container-results-value'> 0</div> </div></h4>
          </div><br/><br/>
     </div><br/><br/>
     <div class='game-container'>
          <!--<div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell-digit'>2</div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>
          <div class='game-container-cell'></div>-->
     </div>
</div>
