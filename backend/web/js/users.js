function Users(){

     this.checkAccess = function (elem){
          //var checkBox = $('#checkbox' + elem);
          //alert(checkBox.val());
          var url = "/admin/users/access?id=" + elem;
          $(location).attr('href',url);
          //$.pjax({container: '#pjax-container', timeout: 0});
          /*$.ajax({
               url: '<?php echo Yii::$app->request->baseUrl. '/admin/users/access' ?>',
               type: 'post',
               data: {
                         id: elem,
                         _csrf : '<?=Yii::$app->request->getCsrfToken()?>'
                     },
               success: function (data) {
                  console.log(data.search);
               }

          });
          */
     }

}

var users = new Users();
