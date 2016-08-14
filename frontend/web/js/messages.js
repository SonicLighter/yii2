$(document).ready(function(){

     // SCROLL BAR

     $('.scrollbar-inner').scrollbar();

     function WebPage(){

          this.updatePermisstion = true;

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


     var timer = setInterval(function(){
          if(webPage.updatePermisstion){
               webPage.updateGrid(webPage.getUrlParams()['id']);
          }
     }, 10000);


     // SCROLLING MESSAGES

     $('.scrollbar-inner').scroll(function(){
          if(this.scrollTop >= (this.scrollHeight-this.clientHeight-5)){
               webPage.updatePermisstion = false;
          }
          if(this.scrollTop <= 10){
               webPage.updatePermisstion = true;
          }
     });


     // ENTER BUTTON

     $('#messageInput').keydown(function(eventObject){
          if(eventObject.which == 13){
               //alert($('#messageInput').val());
               //clearInterval(timer);
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
