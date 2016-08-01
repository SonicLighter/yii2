function Users(){

     this.checkAccess = function (elem){
          var checkBox = $('#checkbox' + elem);
          //alert(checkBox.val());
          var url = "/admin/users/access?id=" + elem;
          $(location).attr('href',url);
     }

}

var users = new Users();
