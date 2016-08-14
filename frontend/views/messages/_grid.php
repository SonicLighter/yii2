<?php

/* @var $this yii\web\View */
/* @var $dataProvider DataProvider */
/* @var $loadPage Count of scrolling */


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

Yii::$app->view->registerJsFile('../js/messages.js', ['depends' => [\yii\web\JqueryAsset::className()]]);
?>

<div id='gridUpdateContainer'>
    <?= GridView::widget([
        'id' => 'gridViewMessages',
        'dataProvider' => $dataProvider,
        'summary' => false,
        //'layout' => "{pager}\n{items}\n{pager}",
        'tableOptions' => [
            'class' => 'myGridView', /*table table-striped table-bordered*/
        ],

        'pager' => [
            'class' => ScrollPager::className(),
            //'spinnerSrc' => ' ',
            'overflowContainer' => '.scroll-content',
            'container' => '.grid-view tbody',
            'item' => 'tr',
            'paginationSelector' => '.grid-view .pagination',
            'triggerText' => 'Load more messages...',
            'noneLeftText' => '',
            'triggerOffset' => $loadPage,
            'triggerTemplate' => '<tr class="ias-trigger"><td colspan="100%" style="text-align: center"><a style="cursor: pointer"><div class="loadMore">{text}</div></a></td></tr>',
        ],

        'columns' => [
            [
                'format' => 'html',
                'value' => function($model){
                    if($model->senderId == Yii::$app->user->id){$wrapper = 'myMessageWrapper';}
                    else{$wrapper = 'otherMessageWrapper';}
                    $profilePicture = Html::img(Url::toRoute($model->sender->profilePicture), ['class' => 'imageWidth']);
                    $resultString = "
                          <p><div class='".$wrapper."'>
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
