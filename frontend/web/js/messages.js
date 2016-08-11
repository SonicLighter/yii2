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

          this.getElemsCount = function(){
               return $('.myMessageWrapper').length + $('.otherMessageWrapper').length;
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
                         if(response == 1){
                              form.trigger('reset');
                              $.pjax.reload({container: '#messages-container'});
                         }
                         else{
                              alert('Error: we can\'t add your message to database, sorry.');
                         }
                    }
               });
          }
          return false;  // if <else> then form will not be submited after ajax request
     });

     // SCROLL BAR

     $('.messagesContent').scrollbar();

});
