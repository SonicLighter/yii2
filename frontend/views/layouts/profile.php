<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use yii\helpers\Url;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\widgets\Breadcrumbs;
use frontend\assets\AppAsset;
use bluezed\scrollTop\ScrollTop;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?= Html::csrfMetaTags() ?>
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body>
<?php $this->beginBody() ?>

<div class="wrap" style="background: #DDDDDD">

     <?= $this->render('_navigation'); ?>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>

        <div class='col-md-2 col-sm-3 hidden-xs profile-column'>
             <div class='profile-left_column'>
                  <?=
                       $this->render('profile/_menu', [
                            'id' => Yii::$app->user->id,
                            'myMessages' => Yii::$app->user->identity->myMessages,
                            'waitingCount' => Yii::$app->user->identity->waitingCount,
                            'notAcceptedCount' => Yii::$app->user->identity->notAcceptedCount,
                       ]);
                  ?>
            </div>
        </div>

        <div class='col-md-10 col-sm-8 profile-column-without-paddings'>
             <div class='row'>

                  <div class='col-md-3 col-sm-12 profile-column'>
                       <div class='profile-middle_column'>
                            <?=
                                 $this->render('profile/_picture', [
                                      'model' => Yii::$app->user->identity,
                                 ]);
                            ?>
                       </div>
                  </div>

                  <div class='col-md-9 col-sm-12 profile-column'>

                      <?= $content ?>

                 </div>

            </div>
       </div>

    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; SOCIALNETWORK <?= date('Y') ?></p>

        <p class="pull-right"></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
