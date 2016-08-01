function checkAccess(elem){
     var checkBox = $('#checkbox' + elem);
     alert(checkBox.val());
     var url = "../users/access?id=" + elem;
     $(location).attr('href',url);
}
