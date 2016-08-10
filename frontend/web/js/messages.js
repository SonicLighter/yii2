$(document).ready(function(){

     function WebPage(){

          this.getUrlParams = function(){

               var $_GET = {};
               var __GET = window.location.search.substring(1).split("&");
               for(var i=0; i<__GET.length; i++) {
                  var getVar = __GET[i].split("=");
                  $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
               }

               return $_GET;

          }

          this.getUrlParamsCount = function(object){

               var count = 0;
               for(var key in object){
                    count++;
               }

               return count;

          }

     }

     var webPage = new WebPage();

     $('body').click(function(){
          var url = window.location.href;

          if(webPage.getUrlParamsCount(webPage.getUrlParams()) > 1){
               //alert('DO NOT UPDATE!');
          }
          else{
               //alert('UPDATE!');
          }

     });

});
