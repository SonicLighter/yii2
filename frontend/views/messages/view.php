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
*/

$this->title = 'Dialog with '.$modelUser->username;
Yii::$app->view->registerJsFile('../js/messages.js', ['depends' => [\yii\web\JqueryAsset::className()]]);
?>

<div class='profile-right_item'>
     <h5> Dialog with <?= Html::a($modelUser->username, Url::toRoute(['profile/index', 'id' => $modelUser->id])); ?> </h5>

     <div class='messagesContent scrollbar-inner'>
          <?= GridView::widget([
              'dataProvider' => $dataProvider,
              'summary' => false,
              //'layout' => "{pager}\n{items}\n{pager}",
              'tableOptions' => [
                   'class' => 'myGridView', /*table table-striped table-bordered*/
              ],

              'pager' => [
                    'class' => ScrollPager::className(),
                    'overflowContainer' => '.messagesContent',
                    'container' => '.grid-view tbody',
                    'item' => 'tr',
                    'paginationSelector' => '.grid-view .pagination',
                    'triggerText' => 'Load more messages...',
                    'noneLeftText' => '',
                    'triggerOffset' => $loadPage,
                    'triggerTemplate' => '<tr class="ias-trigger"><td colspan="100%" style="text-align: center"><a style="cursor: pointer"><div class="btn btn-content">{text}</div></a></td></tr>',
              ],

              'columns' => [
                   [
                        'format' => 'html',
                        'value' => function($model){
                             if($model->senderId == Yii::$app->user->id){$wrapper = 'myMessageWrapper';}
                             else{$wrapper = 'otherMessageWrapper';}
                             $profilePicture = Html::img(Url::toRoute($model->sender->profilePicture), ['class' => 'imageWidth']);
                             $resultString = "
                                   <div class='".$wrapper."'>
                                        <div class='messageImage'>
                                             ".$profilePicture."
                                        </div>
                                        <div class='messageContent'>
                                             <div class='message-user-name'>".Html::a($model->sender->username, Url::toRoute(['profile/index', 'id' => $model->sender->id]))."</div>
                                             <div class='messages-date'>".$model->date."</div>
                                             <div class='messageText'>".$model->message."</div>
                                        </div>
                                   </div>
                             ";

                             return $resultString;
                        },
                   ],
              ],
          ]);?>
     </div>




          <?php $form = ActiveForm::begin([
               'id' => 'messages-form',
               'action' => ['messages/add', 'id' => $modelUser->id],
               'method' => 'post',
          ]); ?>

          <?= $form->field($model, 'message')->textArea(['rows' => 2]); ?>

          <?= Html::submitButton('Send', ['class' => 'btn btn-default', 'name' => 'posts-button']) ?>

          <?php ActiveForm::end(); ?>

</div>
