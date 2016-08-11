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

class MessagesController extends Controller{

    public $layout = 'profile';

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                         'actions' => ['index', 'view', 'add'],
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

         Url::remember();
         $pageType = 'messages';
         $searchModel = new UserSearch($pageType);
         $dataProvider = $searchModel->search(Yii::$app->request->get());

         Yii::$app->view->params['userModel'] = Yii::$app->user->identity;
         return $this->render('index', [
              'dataProvider' => $dataProvider,
              'searchModel' => $searchModel,
              'pageType' => $pageType,
              'loadPage' => User::getDialogLoading(),
         ]);

    }

    public function actionView($id){

         $modelUser = User::findIdentity($id);
         if(!empty($modelUser) && (Yii::$app->user->id != $id)){
              $model = new Messages();
              $dataProvider = Messages::getUserMessages($id);
              Messages::setMessagesOpened($id);
              Yii::$app->view->params['userModel'] = $modelUser;
              return $this->render('view',[
                   'modelUser' => $modelUser,
                   'model' => $model,
                   'dataProvider' => $dataProvider,
                   'loadPage' => Messages::getMessagePages($id),
              ]);
         }

         return $this->redirect(Url::toRoute('profile/errors'));

    }

    public function actionAdd($id){

         $modelUser = User::findIdentity($id);
         if(!empty($modelUser) && (Yii::$app->user->id != $id)){
              $model = new Messages();
              $model->senderId = Yii::$app->user->id;
              $model->receiverId = $id;
              $model->date = Yii::$app->getFormatter()->asDateTime(time());
              $model->opened = 0;
              if(($model->load(Yii::$app->request->post()) && $model->validate() && $model->save())){
                    echo 1;
                    return $this->redirect(Url::toRoute(['messages/view', 'id' => $id]));
              }
         }

          echo 2;
          return $this->redirect(Url::toRoute('profile/errors'));

    }

}

?>
