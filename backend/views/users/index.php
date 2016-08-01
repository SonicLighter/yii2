<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\widgets\LinkPager;
use yii\grid\GridView;
use yii\bootstrap\ActiveForm;
use yii\grid\ActionColumn;
use yii\helpers\Url;
use yii\helpers\ArrayHelper;
use yii\grid\DataColumn;
use common\models\User;
use common\models\Roles;
use \kop\y2sp\ScrollPager;
use kartik\checkbox\CheckboxX;
use \yii\widgets\Pjax;

$this->title = 'Users';
//$this->registerJsFile('@web/js/users.js');
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>
    <p>

         <?php
              if(key(Yii::$app->authManager->getRolesByUser(Yii::$app->user->getId())) == 'admin'){
                   echo Html::a('Create User', ['create'], ['class' => 'btn btn-default']);
              }
         ?>
         <?= Html::a('Refresh filters', ['index'], ['class' => 'btn btn-default']) ?>

    </p>
     <?php Pjax::begin(); ?>
         <?=
              GridView::widget([
                   'dataProvider' => $dataProvider,
                   'filterModel' => $searchModel,
                   'pager' => [
                         'class' => ScrollPager::className(),
                         'container' => '.grid-view tbody',
                         'item' => 'tr',
                         'paginationSelector' => '.grid-view .pagination',
                         'triggerText' => 'Load more posts...',
                         'noneLeftText' => 'End of page',
                         'spinnerSrc' => '',
                         'spinnerTemplate' => '',
                         'triggerOffset' => $loadCount,
                         'noneLeftTemplate' => '',
                         'triggerTemplate' => '<tr class="ias-trigger"><td colspan="100%" style="text-align: center"><a style="cursor: pointer"><div class="btn btn-content">{text}</div></a></td></tr>',
                   ],
                   'columns' => [
                        [
                            'class' => DataColumn::className(), // this line is optional
                            'attribute' => 'email',
                            'label' => 'E-mail',
                            //'header' => 'Name',
                            'value' => 'email',
                       ],
                       [
                            'class' => DataColumn::className(), // this line is optional
                            'attribute' => 'username',
                            'label' => 'Name',
                            //'header' => 'Name',
                            'value' => 'username',
                       ],
                       [
                            'class' => DataColumn::className(), // this line is optional
                            //'header' => 'Role',
                            'attribute' => 'userRole',
                            'label' => 'User Role',
                            'filter' => $roles,
                            'value' => 'userRole',
                            /*'value' => function($model){
                                 return key(Yii::$app->authManager->getRolesByUser($model->id));
                            },*/
                       ],
                       [
                            //'class' => DataColumn::className(), // this line is optional
                            'attribute' => 'postCount',
                            'label' => 'Posts count',
                            'value' => 'postCount',
                            'filter' => false,
                       ],
                       [

                            /*
                            'header' => 'Confirm',
                            'class' => 'yii\grid\CheckboxColumn',
                            'checkboxOptions' => function($model) {
                                 return ['checked' => $model->profile->access];
                            },
                            'visible' => Yii::$app->user->can("openRoles"),
                            */
                            'header' => 'Confirm',
                            'format' => 'raw',
                             'value' => function ($model, $index, $widget) {
                                 //return Html::a("Обновить", ['users/index', 'id' => $index]);
                                 return Html::checkbox('checkbox', $model->profile->access, ['id' => 'checkbox'.$index, 'onclick' => 'users.checkAccess('.$index.')','value' => $index, 'disabled' => false]);

                             },
                             /*
                             'value' => function($model, $index, $widget){

                                return CheckboxX::widget([
                                       'name'=>'checkbox'.$index,
                                       'value'=>$model->profile->access,
                                       'options'=>['value' => $index, 'disabled' => false],
                                       'autoLabel'=>true,
                                       'pluginOptions'=>['threeState'=>false],
                                   ]);

                             }
                             */

                       ],
                       [
                            'header' => 'Options',
                            'class' => ActionColumn::className(),
                            'template' => '{update} {delete}',
                            'buttons' => [
                                 'update' => function($url, $model){
                                      return Html::a('<span class="glyphicon glyphicon-pencil"></span>', $url,
                                       [
                                           'title' => Yii::t('app', 'Update user'),
                                       ]);
                                 },
                                 'delete' => function($url, $model){
                                      if($model->id !=Yii::$app->user->getId()){
                                           return Html::a('<span class="glyphicon glyphicon-trash"></span>', $url,
                                            [
                                                'title' => Yii::t('app', 'Delete user'),
                                            ]);
                                      }
                                 },
                            ],
                            'visible' => Yii::$app->user->can("openRoles"),
                            'options' => ['style' => 'width: 65px; max-width: 65px;'],
                       ],
                   ],
               ]);
          ?>
     <?php Pjax::end(); ?>
</div>
