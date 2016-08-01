<?php

namespace backend\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use yii\helpers\Url;

/**
 * Default controller for the `admin` module
 */
class MainController extends Controller
{

     public $layout = 'main';

     public function behaviors()
     {
         return [
            'access' => [
                 'class' => AccessControl::className(),
                 'rules' => [
                     [
                          'actions' => ['index'],
                          'allow' => !Yii::$app->user->isGuest,
                          'roles' => ['openUsers'],
                     ],
                 ],
            ],
         ];
     }

     public function beforeAction($action){


         if(!Yii::$app->user->isGuest && ((Yii::$app->user->identity->userRole != 'admin') && (Yii::$app->user->identity->userRole != 'moderator'))){
              return $this->redirect(Url::toRoute(['../profile/index', 'id' => Yii::$app->user->id]))->send();
         }
         else if(Yii::$app->user->isGuest){
              return $this->redirect(Url::toRoute(['../site/index']))->send();
         }

         return true;

     }

     public function actionIndex(){

          return $this->render('index');

     }

}

?>
