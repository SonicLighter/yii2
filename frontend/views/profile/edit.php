<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\LinkPager;
use yii\grid\GridView;
use yii\bootstrap\ActiveForm;
use kartik\file\FileInput;
use yii\bootstrap\Tabs;

$this->title = 'Edit Profile';
//var_dump($model->activeNew);
//die();
?>

<div class="site-about">
     <div class='col-md-2 col-sm-3 hidden-xs profile-column'>
          <div class='profile-left_column'>
               <?=
                    $this->render('user/menu', [
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
                              $this->render('user/picture', [
                                   'model' => $userModel,
                              ]);
                         ?>
                    </div>
               </div>
               <div class='col-md-9 col-sm-12 profile-column'>
                    <div class='profile-right_item'>
                         <div class='profile-right_item-username'>
                              <?php echo Html::encode($this->title) ?>
                         </div>
                         <div class='profile-right_item-active'>
                         </div>
                         <br/>
                         <hr/>
                         <?php
                                $pictureActive = false;
                                $accessActive = false;
                                $infoActive = false;
                                switch ($model->scenario) {
                                     case 'editProfile':{
                                          $accessActive = true;
                                          break;
                                     }
                                     case 'editPicture':{
                                          $pictureActive = true;
                                          break;
                                     }
                                     default:
                                          $infoActive = true;
                                          break;
                                }
                         ?>
                        <?=
                             Tabs::widget([
                                 'items' => [
                                     [
                                         'label' => 'Public',
                                         'content' => Yii::$app->controller->renderPartial('edit/picture', [
                                              'model' => $model,
                                         ]),
                                         'active' => $pictureActive,
                                     ],
                                     [
                                         'label' => 'Access',
                                         'content' => Yii::$app->controller->renderPartial('edit/access', [
                                              'model' => $model,
                                         ]),
                                         'active' => $accessActive,
                                     ],
                                     [
                                         'label' => 'Profile info',
                                         'content' => Yii::$app->controller->renderPartial('edit/info', [
                                              'model' => $model,
                                         ]),
                                         'active' => $infoActive,
                                     ],
                                 ],
                             ])
                        ?>
                    </div>
               </div>
          </div>
     </div>
</div>
