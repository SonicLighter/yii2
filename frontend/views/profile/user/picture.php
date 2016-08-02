<?php
use yii\helpers\Html;
use yii\widgets\LinkPager;
use yii\grid\GridView;
use yii\bootstrap\ActiveForm;
use yii\helpers\Url;
use yii\grid\DataColumn;
use yii\widgets\ListView;
use \kop\y2sp\ScrollPager;
use yii\bootstrap\Button;

?>

<?= Html::img(Url::toRoute($model->profilePicture), ['width' => '100%']) ?>
<br/><br/>
<?php
   if($model->id != Yii::$app->user->id){
         echo Html::a("Send message", [Url::toRoute(['messages/view', 'id' => $model->id])] , ['class' => 'btn btn-profile-menu-selected']);
         if(empty($model->friend)){
              echo Html::a("Add to friends", [Url::toRoute(['profile/invite', 'id' => $model->id])], ['class' => 'btn btn-profile-menu-selected']);
         }
         else{
              if(!empty($model->receiver) && ($model->receiver->accepted == 0)){
                   echo Html::a("Accept user&nbsp", [Url::toRoute(['profile/accept', 'id' => $model->id])], ['class' => 'btn btn-profile-menu-selected']);
              }
              echo Html::a("Delete friend", [Url::toRoute(['profile/remove', 'id' => $model->id])], ['class' => 'btn btn-profile-menu-selected']);
         }
   }
?>
