function Users(){

     this.checkAccess = function (elem){
          /*
          var url = "/admin/users/access?id=" + elem;
          $(location).attr('href',url);
          */
          $.ajax({
              url: "/admin/users/access?id=" + elem,
              type: 'GET',
              contentType: "application/json; charset=utf-8",
              dataType: "json",
          });
     }

}

var users = new Users();
