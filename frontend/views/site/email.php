<?php

/* @var $this yii\web\View */

use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\LinkPager;
use yii\grid\GridView;
use yii\bootstrap\ActiveForm;
use dosamigos\tinymce\TinyMce;

$this->title = 'E-mail';

?>

<?php
     if($result == 1){
          echo "
               <div class='postCreate'>
                    <div class='alert alert-success'>
                         You successfully create your own account!
                    </div>
                    You should check your email address, and use link to activate your profile!
               </div>
          ";
     }
     else{
          echo "
               <div class='postCreate'>
                    <div class='alert alert-success'>
                         Congratulations! Your profile activated successfully!
                    </div>
                    Lest get it started! To open your personal page you should ".Html::a('login', Url::toRoute('site/login'))." your profile!
               </div>
          ";
     }
?>
