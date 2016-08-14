$(document).ready(function(){

     // SCROLL BAR

     $('.scrollbar-inner').scrollbar();

     function WebPage(){

          /*
          this.openLinkPermission = false;

          this.linkArray = [];

          this.getUrlParamsCount = function(object){
               var count = 0;
               for(var key in object){
                    count++;
               }
               return count;
          }

          this.getElemsCount = function(){
               return $('.myMessageWrapper').length + $('.otherMessageWrapper').length;
          }

          this.addToArray = function(link){
               this.linkArray[this.linkArray.length] = link;
          }

          this.checkLink = function(link){
               if(this.linkArray.indexOf(link) == -1){
                    return true;
               }
               return false;
          }
          */

          this.getUrlParams = function(){
               var $_GET = {};
               var __GET = window.location.search.substring(1).split("&");
               for(var i=0; i<__GET.length; i++) {
                    var getVar = __GET[i].split("=");
                    $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1];
               }
               return $_GET;
          }

          this.updateGrid = function(id){

               var url = 'update-messages?id=' + id;
               $.ajax({
                    url: url,
                    type: 'get',
                    success: function(response){
                         $('#gridUpdateContainer').empty();
                         $('#gridUpdateContainer').append(response);
                    }
               });

          }

     }

     var webPage = new WebPage();

     // ENTER BUTTON

     $('#messageInput').keydown(function(eventObject){
          if(eventObject.which == 13){
               //alert($('#messageInput').val());
          }
     });

     // SUBMIT BUTTON

     $(document).on('beforeSubmit', '#messages-form', function(){
          if($('#messageInput').val().length > 1){
               var form = $(this);
               if(form.find('.has-error').length){
                    return false;
               }
               // submit form
               $.ajax({
                    url: form.attr('action'),
                    type: 'post',
                    data: form.serialize(),
                    success: function(response){
                         form.trigger('reset');
                         //$.pjax.reload({container: '#messages-container'});
                         webPage.updateGrid(webPage.getUrlParams()['id']);
                    }
               });
          }
          return false;  // if <else> then form will not be submited after ajax request
     });

});
