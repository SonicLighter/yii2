<?php
namespace backend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use frontend\models\LoginForm;
use yii\helpers\Url;

/**
 * Site controller
 */
class SiteController extends Controller
{

     public $layout = 'login';

    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions' => ['index', 'error', 'login'],
                        'allow' => true,
                    ],
                    [
                        'actions' => ['index'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                         'actions' => ['logout'],
                         'allow' => !Yii::$app->user->isGuest,
                    ],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function actionIndex()
    {

         if (!Yii::$app->user->isGuest) {
             switch (Yii::$app->user->identity->userRole) {
                   case 'admin':
                   case 'moderator':{
                        return $this->redirect(Url::toRoute(['main/index']))->send();
                        break;
                   }
                   default:
                        return $this->redirect(Url::toRoute(['../profile/index', 'id' => Yii::$app->user->id]))->send();
                        break;
             }
         }

         $model = new LoginForm();
         $model->scenario = 'adminpanel';
         if ($model->load(Yii::$app->request->post()) && $model->login()) {
             return $this->redirect(Url::toRoute(['main/index']))->send();
         }
         return $this->render('index', [
             'model' => $model,
         ]);

    }

    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    public function actionLogin(){

         return $this->redirect('index');

    }

}
