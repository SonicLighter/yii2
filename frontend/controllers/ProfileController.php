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
use yii\data\Pagination;
use common\models\search\UserSearch;
use frontend\models\search\PostsSearch;
use yii\web\UploadedFile;
use yii\helpers\Url;
use yii\web\NotFoundHttpException;
use yii\helpers\ArrayHelper;
//use bupy7\bbcode\BBCodeBehavior;

class ProfileController extends Controller{

    public $layout = 'profile';

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                         'actions' => ['index', 'edit', 'picture', 'search', 'friends', 'invite', 'remove', 'accept', 'requests', 'waiting','errors', 'deletecomment', 'comment', 'info'],
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

    public function beforeAction($action){
         Yii::$app->view->params['userModel'] = Yii::$app->user->identity;
         return true;
    }

    public function actionIndex($id){
         //throw new NotFoundHttpException('User does not exist!');
         if(is_numeric($id)){
              $model = User::findIdentity($id);
              if(!empty($model)){
                   Url::remember();

                   $searchModel = new PostsSearch($id);
                   $dataProvider = $searchModel->search(Yii::$app->request->get());
                   Yii::$app->view->params['userModel'] = $model;
                   //$dataProvider = Posts::getPagePosts($id);
                   return $this->render('index',[
                        'searchModel' => $searchModel,
                        'dataProvider' => $dataProvider,
                        'model' => $model,
                        'loadCount' => Posts::getLoadCount($id),
                   ]);
              }
         }
         return $this->redirect('errors');

    }

    public function actionEdit(){

         $model = User::findOne(Yii::$app->user->id)->profile;
         $model->scenario = 'editProfile';
         $model->username = $model->user->username;
         $model->dob = $model->birthday;
         if($model->load(Yii::$app->request->post()) && $model->validate() && $model->save() && $model->user->save()){
              return $this->redirect([Url::previous()]);
         }

         return $this->render('edit', [
              'model' => $model,
         ]);

    }

    public function actionPicture(){

         $model = User::findOne(Yii::$app->user->id)->profile;
         $model->scenario = 'editPicture';
         if(Yii::$app->request->isPost){
              $model->picture = UploadedFile::getInstance($model, 'picture');
              $model->picture->saveAs("..\..".Yii::getAlias('@profilePictures').'/'.$model->user->id.'.jpg');
              return $this->redirect([Url::previous()]);
         }

         return $this->render('edit', [
              'model' => $model,
         ]);

    }

    public function actionInfo(){

         $model = User::findOne(Yii::$app->user->id)->profile;
         $model->scenario = 'profileInfo';
         if($model->load(Yii::$app->request->post()) && $model->validate() && $model->save()){
              return $this->redirect([Url::previous()]);
         }

         return $this->render('edit', [
              'model' => $model,
         ]);

    }

    public function actionSearch(){

         Url::remember();
         $pageType = 'search';
         $searchModel = new UserSearch($pageType);
         $dataProvider = $searchModel->search(Yii::$app->request->get());

         return $this->render('search', [
              'dataProvider' => $dataProvider,
              'searchModel' => $searchModel,
              'pageType' => $pageType,
              'loadPage' => User::find()->where(['id' => ArrayHelper::getColumn(Profile::find()->where(['active' => 1])->all(), 'userId')])->count(),
              'page' => 'Search',
         ]);

    }

    public function actionFriends(){

         Url::remember();
         $pageType = 'friends';
         $searchModel = new UserSearch($pageType);
         $dataProvider = $searchModel->search(Yii::$app->request->get());

         return $this->render('search', [
              'dataProvider' => $dataProvider,
              'searchModel' => $searchModel,
              'pageType' => $pageType,
              'loadPage' => count(Friends::getUserFriends(1)),
              'page' => 'My friends',
         ]);

    }

    public function actionRequests(){

         Url::remember();
         $pageType = 'requests';
         $searchModel = new UserSearch($pageType);
         $dataProvider = $searchModel->search(Yii::$app->request->get());

         return $this->render('search', [
              'dataProvider' => $dataProvider,
              'searchModel' => $searchModel,
              'pageType' => $pageType,
              'loadPage' => count(Friends::getUserRequests()),
              'page' => 'My requests',
         ]);

    }

    public function actionWaiting(){

         Url::remember();
         $pageType = 'waiting';
         $searchModel = new UserSearch($pageType);
         $dataProvider = $searchModel->search(Yii::$app->request->get());

         return $this->render('search', [
              'dataProvider' => $dataProvider,
              'searchModel' => $searchModel,
              'pageType' => $pageType,
              'loadPage' => count(Friends::getUserWaiting()),
              'page' => 'New friends',
         ]);

    }

    public function actionInvite($id){

         if(is_numeric($id) && empty(Friends::findFriend($id)) && (Yii::$app->user->id != $id)){
              $newFriend = new Friends();
              $newFriend->senderId = Yii::$app->user->id;
              $newFriend->receiverId = $id;
              $newFriend->accepted = 0;
              if($newFriend->save()){
                   return $this->redirect([Url::previous()]);
              }
         }

         return $this->redirect('errors');

    }

    public function actionRemove($id){
         if(is_numeric($id)){
              $removeFriend = Friends::findFriend($id);
              if(!empty($removeFriend)){   // user with such $id exists and we can remove him from friends
                   if($removeFriend->delete()){
                        return $this->redirect([Url::previous()]);
                   }
              }
         }

         return $this->redirect('errors');

    }

    public function actionAccept($id){
          if(is_numeric($id)){
              $acceptFriend = Friends::findFriend($id);
              if(!empty($acceptFriend) && ($acceptFriend->senderId != Yii::$app->user->id)){ // if you are sender, then you can't accept by get[]
                   $acceptFriend->accepted = 1;
                   if($acceptFriend->save()){
                        return $this->redirect([Url::previous()]);
                   }
              }
          }

         return $this->redirect('errors');

    }

    public function actionComment($id){

         $modelPosts = Posts::find()->where(['id' => $id])->one();
         if(!empty($modelPosts)){
              Url::remember();
              $model = new Comments();
              $model->userId = Yii::$app->user->id;
              $model->postId = $id;
              if($model->load(Yii::$app->request->post()) && $model->validate() && $model->save()){
                   return $this->redirect([Url::previous()]);
              }
              Yii::$app->view->params['userModel'] = $modelPosts->user;
              return $this->render('comment', [
                   'model' => $model,
                   'modelPosts' => $modelPosts,
                   'loadCount' => Comments::find()->where(['postId' => $id])->count(),
              ]);
         }

         return $this->redirect('errors');

    }

    public function actionDeletecomment($id){
         if(is_numeric($id)){
              $removeComment = Comments::find()->where(['id' => $id, 'userId' => Yii::$app->user->id])->one();
              if(!empty($removeComment)){
                   if($removeComment->delete()){
                        return $this->redirect([Url::previous()]);
                   }
              }
         }

         return $this->redirect('errors');

    }

    public function actionErrors(){

         return $this->render('errors');

    }

}

?>
