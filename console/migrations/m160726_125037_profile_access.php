<?php

use yii\db\Migration;
use common\models\User;

class m160726_125037_profile_access extends Migration
{
    public function up()
    {

         $this->addColumn('profile', 'access', $this->integer());
         $users = User::find()->all();
         foreach ($users as $user) {
             $this->update('profile', ['access' => 1], "userId=".$user->id);
         }

    }

    public function down()
    {
         $this->dropColumn('profile', 'access');
    }

    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }

    public function safeDown()
    {
    }
    */
}
