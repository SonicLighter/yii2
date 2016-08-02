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

$this->title = 'People';
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
                              <?php echo $page ?>
                         </div>
                         <div class='profile-right_item-active'>
                         </div>
                         <br/><hr/>
                         Fill following search field to find your friend:
                    </div>
                    <hr/>
                    <?=
                         GridView::widget([
                              'dataProvider' => $dataProvider,
                              'filterModel' => $searchModel,
                              'summary' => false,
                              'emptyText' => '',
                              'tableOptions' => [
                                  'class' => 'myGridView', /*table table-striped table-bordered*/
                              ],
                              'pager' => [
                                     'class' => ScrollPager::className(),
                                     'container' => '.grid-view tbody',
                                     'item' => 'tr',
                                     'paginationSelector' => '.grid-view .pagination',
                                     'triggerText' => 'Load more messages...',
                                     'noneLeftText' => '',
                                     'triggerOffset' => $loadPage,
                                     'triggerTemplate' => '<tr class="ias-trigger"><td colspan="100%" style="text-align: center"><a style="cursor: pointer"><div class="userMenu">{text}</div></a></td></tr>',
                              ],
                              'columns' => [
                                  [
                                       'class' => DataColumn::className(),
                                       'attribute' => 'username',
                                       'label' => '',
                                       'format' => 'html',
                                       //'header' => 'Name',
                                       'value' => function($model){
                                            $acceptButton = "";
                                            $infoMessage = "";
                                            if(empty($model->friend)){
                                                 $resultButton = Html::a('Add to friends', [Url::toRoute(['invite', 'id' => $model->id])], ['class' => 'btn btn-default']);
                                            }
                                            else{
                                                 if(!empty($model->sender) && ($model->sender->accepted == 0)){
                                                      $infoMessage = "Info: This user did not accept you yet.";
                                                 }
                                                 else if(!empty($model->receiver) && ($model->receiver->accepted == 0)){
                                                      $infoMessage = "Info: You didn't accept this user.";
                                                      $acceptButton = Html::a('Accept user&nbsp', [Url::toRoute(['accept', 'id' => $model->id])], ['class' => 'btn btn-default']);
                                                 }
                                                 $resultButton = Html::a('Delete friend', [Url::toRoute(['remove', 'id' => $model->id])], ['class' => 'btn btn-default']);
                                            }
                                            $resultString =
                                                "<div class='profile-right_item-friends'>
                                                      <div class='searchLeftColumn'>
                                                           ".Html::img(Url::toRoute($model->profilePicture), ['width' => '120px'])."
                                                      </div>
                                                      <div class='searchMiddleColumn'>
                                                           <h4>Username: ". Html::a(HtmlPurifier::process($model->username), [Url::toRoute(['index', 'id' => $model->id])])."</h4>

                                                           E-mail: ".HtmlPurifier::process($model->email)."<br/>

                                                           Role: ".HtmlPurifier::process($model->role->item_name)."<br/>

                                                           ".$infoMessage."

                                                      </div>
                                                      <div class='searchRightColumn'>
                                                           ".$acceptButton."<br/><br/>".$resultButton."
                                                      </div>
                                                 </div>";
                                             return $resultString;
                                       },
                                  ],
                              ],
                         ]);
                     ?>

               </div>
          </div>
     </div>
</div>
