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

<div class="site-about">
     <div class='col-md-2 col-sm-3 hidden-xs profile-column'>
          <div class='profile-left_column'>
               <?=
                    $this->render('../profile/user/menu', [
                         'id' => Yii::$app->user->id,
                         'myMessages' => Yii::$app->user->identity->myMessages,
                         'waitingCount' => $waitingCount,
                         'notAcceptedCount' => $notAcceptedCount,
                    ]);
               ?>
         </div>
     </div>
     <div class='col-md-10 col-sm-8 profile-column-without-paddings'>
          <div class='row'>
               <div class='col-md-3 col-sm-12 profile-column'>
                    <div class='profile-middle_column'>
                         <?=
                              $this->render('../profile/user/picture', [
                                   'model' => $userModel,
                              ]);
                         ?>
                    </div>
               </div>
               <div class='col-md-9 col-sm-12 profile-column'>
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
                                   <?= Html::button('New game',['class' => 'btn btn-default', 'id' => 'newGameButton']) ?>
                              </div>
                              <div style='width:50%;float:left; text-align:right;'>
                                   <h4> <div id='gameScore' class='game-container-results'> <div class='game-container-results-title'>SCORE</div> 0 </div><div id='gameBest' class='game-container-results'> Best: 0 </div></h4>
                              </div><br/><br/>
                         </div><br/>
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
               </div>
          </div>
     </div>
</div>
