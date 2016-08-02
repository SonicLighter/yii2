<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\widgets\LinkPager;
use yii\grid\GridView;
use yii\bootstrap\ActiveForm;
use dosamigos\tinymce\TinyMce;

$this->title = 'Update Post';

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
                              <?= Html::encode($this->title) ?>
                         </div>
                         <div class='profile-right_item-active'>
                         </div>
                         <br/>
                         <hr/>
                         <?php
                              $currentDate = Yii::$app->getFormatter()->asDateTime(time());
                              if($model->commentsCount > 0){
                                echo 'You can\'t update this post, because there is one or more comments!';
                              }
                              else if(((int)((strtotime($currentDate) - strtotime($model->dateCreate))/3550)) >= 1){
                                echo 'You can\'t update this post, because it published more than hour ago!';
                              }
                         ?>
                    </div>
                    <hr/>
                    <div class='profile-right_item'>

                           <?php $form = ActiveForm::begin(['id' => 'posts-form']); ?>

                               <?= $form->field($model, 'userId')->hiddenInput(['value' => $model->userId])->label(false) ?>

                               <?= $form->field($model, 'title')->textInput(['value' => $model->title]) ?>

                               <?= $form->field($model, 'content')->widget(TinyMce::className(), [
                                  'options' => ['rows' => 10],
                                  'value' => $model->content,
                                  'language' => 'en_GB',
                                  'clientOptions' => [
                                      'plugins' => [
                                          "advlist autolink lists link charmap print preview anchor",
                                          "searchreplace visualblocks code fullscreen",
                                          "insertdatetime media table contextmenu paste"
                                      ],
                                      'toolbar' => "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
                                 ],
                               ]);?>

                               <?= $form->field($model, 'dateCreate')->hiddenInput(['value' => $model->dateCreate])->label(false) ?>

                               <?= $form->field($model, 'dateUpdate')->hiddenInput(['value' => $date])->label(false) ?>

                               <div class="form-group">
                                   <?= Html::submitButton('Update', ['class' => 'btn btn-primary', 'name' => 'posts-button']) ?>
                               </div>

                           <?php ActiveForm::end(); ?>
                    </div>
               </div>
          </div>
     </div>
</div>
