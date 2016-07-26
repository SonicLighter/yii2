<?php
use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $user common\models\User */

$accessLink = Yii::$app->urlManager->createAbsoluteUrl(['site/email', 'token' => $user->accessToken]);
?>
<div class="access-confirm">
    <p>Hello <?= Html::encode($user->username) ?>,</p>

    <p>Thank you for registration on SocialNetwork.com</p>
    <p>
         To get access to your profile, you should use following link:
    </p>

    <p><?= Html::a(Html::encode($accessLink), $accessLink) ?></p>
    <p>
         If it's not your account, just ignore this letter!
    </p>
</div>
