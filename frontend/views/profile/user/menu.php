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

   //echo Html::a("<i class='glyphicon glyphicon-eye-close'></i> My Profile", 'options' => [ 'url' => 'profile/index', 'class' => 'btn btn-profile-menu']);
/*   echo Html::a("<i class='glyphicon glyphicon-home'></i> &nbsp My Profile", Url::toRoute(['profile/index', 'id' => $id]), ['class'=>'btn btn-profile-menu']);
   echo Html::a("<i class='glyphicon glyphicon-envelope'></i> &nbsp Messages (".$myMessages.")", [Url::toRoute(['/messages/index'])], ['class' => 'btn btn-profile-menu']);
   echo Html::a("<i class='glyphicon glyphicon-user'></i> &nbsp My Friends", Url::toRoute(['profile/friends']), ['class'=>'btn btn-profile-menu']);
   echo Html::a("<i class='glyphicon glyphicon-time'></i> &nbsp New Friends (".$waitingCount.")", [Url::toRoute(['waiting'])], ['class' => 'btn btn-profile-menu']);
   echo Html::a("<i class='glyphicon glyphicon-star'></i> &nbsp My Requests (".$notAcceptedCount.")", [Url::toRoute(['requests'])], ['class' => 'btn btn-profile-menu']);
*/
?>

<?= Html::a("<i class='glyphicon glyphicon-home'></i> &nbsp My Profile", Url::toRoute(['profile/index', 'id' => $id]), ['class'=>'btn btn-profile-menu']); ?>

<?= Html::a("<i class='glyphicon glyphicon-search'></i> &nbsp Search", [Url::toRoute(['profile/search'])], ['class' => 'btn btn-profile-menu']); ?>

<?= Html::a("<i class='glyphicon glyphicon-envelope'></i> &nbsp Messages (".$myMessages.")", [Url::toRoute(['/messages/index'])], ['class' => 'btn btn-profile-menu']);?>

<?= Html::a("<i class='glyphicon glyphicon-user'></i> &nbsp My Friends", Url::toRoute(['profile/friends']), ['class'=>'btn btn-profile-menu']); ?>

<?= Html::a("<i class='glyphicon glyphicon-time'></i> &nbsp New Friends (".$waitingCount.")", [Url::toRoute(['profile/waiting'])], ['class' => 'btn btn-profile-menu']); ?>

<?= Html::a("<i class='glyphicon glyphicon-star'></i> &nbsp My Requests (".$notAcceptedCount.")", [Url::toRoute(['profile/requests'])], ['class' => 'btn btn-profile-menu']); ?>

<?= Html::a("<i class='glyphicon glyphicon-cog'></i> &nbsp Settings", [Url::toRoute(['profile/edit'])], ['class' => 'btn btn-profile-menu']); ?>
