<?php

namespace frontend\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use frontend\models\LoginForm;
use frontend\models\ContactForm;
use common\models\User;
use frontend\models\Friends;
use common\models\Role;
use frontend\models\Posts;
use common\models\Profile;
use frontend\models\Comments;
use frontend\models\Messages;
use yii\data\Pagination;
use common\models\search\UserSearch;
use frontend\models\search\PostsSearch;
use yii\web\UploadedFile;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;

class GamesController extends Controller{

    public $layout = 'profile';

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                         'actions' => ['index', 'game'],
                         'allow' => !Yii::$app->user->isGuest,
                         'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }

    public function actionIndex(){

         return $this->render('index');

    }

    public function actionGame(){

         return $this->render('game');

    }

}
?>
