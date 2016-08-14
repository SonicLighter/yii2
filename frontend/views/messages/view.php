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
use yii\widgets\Pjax;
use dosamigos\tinymce\TinyMce;

/*
<?php $form = ActiveForm::begin([
     'id' => 'messages-form',
     'enableClientValidation' => false,
     'action' => ['messages/add', 'id' => $modelUser->id],
     'method' => 'post',
]); ?>

<?= $form->field($model, 'message')->widget(TinyMce::className(), [
'options' => ['rows' => 1],
'language' => 'en_GB',
'clientOptions' => [
     'plugins' => [
          "advlist autolink lists link charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table contextmenu paste"
     ],
     'toolbar' => "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
],
]); ?>

<?php ActiveForm::end(); ?>
*/


/*Yii::$app->view->registerCssFile('../js/jquery.scrollbar/includes/style.css');
Yii::$app->view->registerCssFile('../js/jquery.scrollbar/includes/prettify/prettify.css');
Yii::$app->view->registerCssFile('../js/jquery.scrollbar/jquery.scrollbar.css');

Yii::$app->view->registerJsFile('../js/jquery.scrollbar/includes/prettify/prettify.js', ['depends' => [\yii\web\JqueryAsset::className()]]);
Yii::$app->view->registerJsFile('../js/jquery.scrollbar/jquery.scrollbar.js', ['depends' => [\yii\web\JqueryAsset::className()]]);
Yii::$app->view->registerJsFile('../js/messages.js', ['depends' => [\yii\web\JqueryAsset::className()]]); */

$this->title = 'Dialog with '.$modelUser->username;

?>

<div class='profile-right_item'>
     <h5> Dialog with <?= Html::a($modelUser->username, Url::toRoute(['profile/index', 'id' => $modelUser->id])); ?> </h5>

     <div class="messagesContent content">
          <div class="demo">
               <div class="scrollbar-inner">

                    <?php Pjax::begin(['id' => 'messages-container']) ?>
                    <?= $this->render('_grid', ['dataProvider' => $dataProvider, 'loadPage' => $loadPage]); ?>
                    <?php Pjax::end(); ?>

               </div>
          </div>
     </div>
     <br/>
     <?php $form = ActiveForm::begin([
          'id' => 'messages-form',
          'enableClientValidation' => false,
          'action' => ['messages/add', 'id' => $modelUser->id],
     ]); ?>

     <div class="sendMessageForm">
         <div class="sendMessageFormPictureLeft">
             <?= Html::img(Url::toRoute(Yii::$app->user->identity->profilePicture), ['class' => 'imageWidth']); ?>
         </div>
         <div class="sendMessageFormInput">
             <?= $form->field($model, 'message')->textArea(['id' => 'messageInput']); ?>
         </div>
         <div class="sendMessageFormPictureRight">
             <?= Html::img(Url::toRoute($modelUser->profilePicture), ['class' => 'imageWidth']); ?>
         </div>
     </div>

     <div class="sendMessageFormSubmit">
        <?= Html::submitButton('Send message', ['class' => 'btn btn-default', 'name' => 'posts-button', 'id' => 'messageSubmitButton']) ?>
     </div>

     <?php ActiveForm::end(); ?>
</div>
