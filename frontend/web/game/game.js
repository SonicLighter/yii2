$(document).ready(function(){

     function Game(){

          this.score = 0;
          this.best = 0;
          this.printPermission = true;
          this.gameOver = false;
          this.gameContinue = false;
          this.cookiesTime = 24000;

          this.threadsFinished = 0;

          // new values
          this.newRandomX = -1;
          this.newRandomY = -1;
          this.showNewPermisson = true;

          this.fieldArray = [
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
          ];

          /*
               [2, 4, 8, 16],
               [32, 64, 128, 256],
               [512, 1024, 2048, 0],
               [0, 0, 0, 0],

               [4, 64, 4, 8],
               [8, 128, 8, 2],
               [2, 512, 1024, 16],
               [4, 8, 4, 2],
          */

          this.tempFieldArray = [
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
          ];

          this.keyMap = {
            38: 'move up', // Up
            39: 'move right', // Right
            40: 'move down', // Down
            37: 'move left', // Left
            75: 'move up', // Vim up
            76: 'move right', // Vim right
            74: 'move down', // Vim down
            72: 'move left', // Vim left
            87: 'move up', // W
            68: 'move right', // D
            83: 'move down', // S
            65: 'move left'  // A
          };

          this.initial = function(){

               this.gameOver = false;
               this.gameContinue = false;
               this.score = 0;
               this.readCookie();
               this.printGameScore();
               printField(this.fieldArray);

          }

          this.newGame = function(){

               this.gameOver = false;
               this.gameContinue = false;
               this.score = 0;
               this.printGameScore();
               this.newArray();
               this.randomPositions(2);
               this.updateCookie();
               printField(this.fieldArray);

          }

          this.updateCookie = function(){

               setCookie('yii-app-2048-fieldArray-user',this.fieldArray,{expires: getCookiesTime()});
               setCookie('yii-app-2048-score-user',this.score,{expires: getCookiesTime()});
               setCookie('yii-app-2048-best-score-user',this.best,{expires: getCookiesTime()});
               setCookie('yii-app-2048-gameContinue-user',this.gameContinue,{expires: getCookiesTime()});

          }

          var getCookiesTime = function(){

               return this.cookiesTime;

          }

          this.readCookie = function(){

               if(!getCookie('yii-app-2048-best-score-user')){
                    setCookie('yii-app-2048-best-score-user',0,{expires: getCookiesTime()});
               }
               if(!getCookie('yii-app-2048-score-user')){
                    setCookie('yii-app-2048-score-user',0,{expires: getCookiesTime()});
               }
               if(!getCookie('yii-app-2048-fieldArray-user')){
                    this.newGame();
               }
               if(!getCookie('yii-app-2048-gameContinue-user')){
                    setCookie('yii-app-2048-gameContinue-user','false',{expires: getCookiesTime()});
               }

               this.best = parseInt(getCookie('yii-app-2048-best-score-user'));
               this.score = parseInt(getCookie('yii-app-2048-score-user'));
               this.gameContinue = (getCookie('yii-app-2048-gameContinue-user') == 'true')?(true):(false);
               //alert(this.gameContinue);

               var fieldArray = getCookie('yii-app-2048-fieldArray-user');
               //alert(fieldArray);
               var tempArray = [];
               var tempArrayCounter = 0;
               for(var i = 0; i < fieldArray.length; i++){
                    if(fieldArray[i] != ','){
                         var tempDigit = '';
                         while(fieldArray[i] != ','){
                              tempDigit = tempDigit + fieldArray[i];
                              if(i >= fieldArray.length) break;
                              i++;
                         }
                         tempArray[tempArrayCounter] = parseInt(tempDigit);
                         //alert(fieldArray + ' ' + i + ' ' + tempDigit + ' ' + tempArray[tempArrayCounter]);
                         tempArrayCounter++;
                    }
               }
               var position = 0;
               for(var i = 0; i < this.fieldArray.length; i++){
                    for(var j = 0; j < this.fieldArray.length; j++){
                         this.fieldArray[i][j] = tempArray[position];
                         position++;
                    }
               }

          }

          // MOVE

          this.move = function(direction){

               this.getTempArray();
               this.threadsFinished = 0;
               switch (direction) {
                    case 'move up':
                         this.moveUp(direction);
                         break;
                    case 'move right':
                         this.moveRight(direction);
                         break;
                    case 'move down':
                         this.moveDown(direction);
                         break;
                    case 'move left':
                         this.moveLeft(direction);
                         break;
                    default:
                         break;
               }

               if(this.checkWin()){
                    this.gameOver = true;
                    this.finishGame('You win!');
               }
               else if(this.emptyCount() == 0){
                    if(this.checkGameOver()){
                         this.finishGame('Game Over!');
                    }
               }

               game.updateCookie();

          }

          this.moveUp = function(direction){

               for(var j = 0; j < this.fieldArray.length; j++){
                    var stepsFlag = true;
                    var steps = 0;
                    steps = this.takeSteps(direction, j); // 8 4 2 2, 8 4 4, 8 8, 16.
                    for(var i = 1; i < this.fieldArray.length; i++){

                         var stepsCountBool = true;
                         var stepsCount = 0;
                         var stepI = 0;
                         var stepJ = 0;
                         if(this.fieldArray[i][j] != 0){
                              //alert('yes');
                              var tempI = i;
                              while(((this.fieldArray[tempI-1][j] == 0) || ((this.fieldArray[tempI-1][j] == this.fieldArray[tempI][j]) && (steps > 0))) && (tempI > 0)){
                                   if(this.fieldArray[tempI-1][j] == this.fieldArray[tempI][j]){
                                        this.fieldArray[tempI-1][j] = this.fieldArray[tempI][j] * 2;
                                        this.score = this.score + this.fieldArray[tempI-1][j];
                                        this.printGameScore();
                                        steps = steps - 1;
                                        if((tempI+1) <= this.fieldArray.length-1){
                                             this.fieldArray[tempI][j] = this.fieldArray[tempI+1][j];
                                             this.fieldArray[tempI+1][j] = 0;
                                        }
                                        else{
                                             this.fieldArray[tempI][j] = 0;
                                        }
                                        //i = i + steps;
                                   }
                                   else{
                                        this.fieldArray[tempI-1][j] = this.fieldArray[tempI][j];
                                        this.fieldArray[tempI][j] = 0;

                                        if(stepsCountBool){
                                             stepI = tempI;
                                             stepJ = j;
                                             stepsCountBool = false;
                                        }
                                        stepsCount++;

                                   }
                                   tempI = tempI - 1;
                                   //alert('Array:' + this.fieldArray[tempI][j]);
                                   if(tempI == 0) break;
                              }

                         }

                         if(!stepsCountBool){
                              //alert('with animation');
                              this.printPermission = false;
                              this.moveAnimation(stepI, stepJ, stepsCount, direction);
                         }
                         else{
                              if(this.printPermission){
                                   printField(this.fieldArray);
                              }
                              this.threadsFinished++;
                              if(this.threadsFinished == 12){
                                   this.printNewDigits();
                              }
                         }

                    }
               }

          }

          this.moveRight = function(direction){

               for(var i = 0; i < this.fieldArray.length; i++){
                    var steps = 0;
                    steps = this.takeSteps(direction, i);
                    for(var j = this.fieldArray.length - 2; j >= 0; j--){
                         var stepsCountBool = true;
                         var stepsCount = 0;
                         var stepI = 0;
                         var stepJ = 0;
                         if(this.fieldArray[i][j] != 0){
                              //alert('[' + i + ' : ' + j + ']: ' + this.fieldArray[i][j]);
                              var tempI = j;
                              while(((this.fieldArray[i][tempI+1] == 0) || ((this.fieldArray[i][tempI+1] == this.fieldArray[i][tempI]) && (steps > 0))) && (tempI < this.fieldArray.length)){
                                   //alert('d');
                                   if(this.fieldArray[i][tempI+1] == this.fieldArray[i][tempI]){
                                        this.fieldArray[i][tempI+1] = this.fieldArray[i][tempI] * 2;
                                        this.score = this.score + this.fieldArray[i][tempI+1];
                                        this.printGameScore();
                                        steps = steps - 1;
                                        if((tempI-1) >= 0){
                                             this.fieldArray[i][tempI] = this.fieldArray[i][tempI-1];
                                             this.fieldArray[i][tempI-1] = 0;
                                        }
                                        else{
                                             this.fieldArray[i][tempI] = 0;
                                        }
                                   }
                                   else{
                                        this.fieldArray[i][tempI+1] = this.fieldArray[i][tempI];
                                        this.fieldArray[i][tempI] = 0;

                                        if(stepsCountBool){
                                             stepI = i;
                                             stepJ = tempI;
                                             stepsCountBool = false;
                                        }
                                        stepsCount++;

                                   }

                                   //alert('[' + (tempI+1) + ' : ' + j + ']: ' + this.fieldArray[tempI+1][j]);
                                   tempI = tempI + 1;
                                   if(tempI == this.fieldArray.length-1) break;
                                   //this.printRight(i);
                              }
                              //alert('step');
                         }
                         if(!stepsCountBool){
                              this.printPermission = false;
                              this.moveAnimation(stepI, stepJ, stepsCount, direction);
                         }
                         else{
                              if(this.printPermission){
                                   printField(this.fieldArray);
                              }
                              this.threadsFinished++;
                              if(this.threadsFinished == 12){
                                   this.printNewDigits();
                              }
                         }
                    }
               }

          }

          this.moveDown = function(direction){

               for(var j = this.fieldArray.length - 1; j >= 0; j--){
                    var steps = 0;
                    steps = this.takeSteps(direction, j);
                    for(var i = this.fieldArray.length-2; i >= 0; i--){
                         var stepsCountBool = true;
                         var stepsCount = 0;
                         var stepI = 0;
                         var stepJ = 0;
                         if(this.fieldArray[i][j] != 0){
                              var tempI = i;
                              while(((this.fieldArray[tempI+1][j] == 0) || ((this.fieldArray[tempI+1][j] == this.fieldArray[tempI][j]) && (steps > 0))) && (tempI < this.fieldArray.length)){
                                   //alert('d');
                                   if(this.fieldArray[tempI+1][j] == this.fieldArray[tempI][j]){
                                        this.fieldArray[tempI+1][j] = this.fieldArray[tempI][j] * 2;
                                        this.score = this.score + this.fieldArray[tempI+1][j];
                                        this.printGameScore();
                                        steps = steps - 1;
                                        if((tempI-1) >= 0){
                                             this.fieldArray[tempI][j] = this.fieldArray[tempI-1][j];
                                             this.fieldArray[tempI-1][j] = 0;
                                        }
                                        else{
                                             this.fieldArray[tempI][j] = 0;
                                        }
                                        //i = i - steps;
                                   }
                                   else{
                                        this.fieldArray[tempI+1][j] = this.fieldArray[tempI][j];
                                        this.fieldArray[tempI][j] = 0;

                                        if(stepsCountBool){
                                             stepI = tempI;
                                             stepJ = j;
                                             stepsCountBool = false;
                                        }
                                        stepsCount++;

                                   }
                                   //alert('[' + (tempI+1) + ' : ' + j + ']: ' + this.fieldArray[tempI+1][j]);
                                   tempI = tempI + 1;
                                   if(tempI == this.fieldArray.length-1) break;
                              }
                         }
                         if(!stepsCountBool){
                              this.printPermission = false;
                              this.moveAnimation(stepI, stepJ, stepsCount, direction);
                         }
                         else{
                              if(this.printPermission){
                                   printField(this.fieldArray);
                              }
                              this.threadsFinished++;
                              if(this.threadsFinished == 12){
                                   this.printNewDigits();
                              }
                         }
                    }
               }

          }

          this.moveLeft = function(direction){

               for(var i = 0; i < this.fieldArray.length; i++){
                    var steps = 0;
                    steps = this.takeSteps(direction, i);
                    for(var j = 1; j < this.fieldArray.length; j++){
                         var stepsCountBool = true;
                         var stepsCount = 0;
                         var stepI = 0;
                         var stepJ = 0;
                         if(this.fieldArray[i][j] != 0){
                              //alert('[' + i + ' : ' + j + ']: ' + this.fieldArray[i][j]);
                              var tempI = j;
                              while(((this.fieldArray[i][tempI-1] == 0) || ((this.fieldArray[i][tempI-1] == this.fieldArray[i][tempI]) && (steps > 0))) && (tempI > 0)){
                                   //alert('d');
                                   if(this.fieldArray[i][tempI-1] == this.fieldArray[i][tempI]){
                                        this.fieldArray[i][tempI-1] = this.fieldArray[i][tempI] * 2;
                                        this.score = this.score + this.fieldArray[i][tempI-1];
                                        this.printGameScore();
                                        steps = steps - 1;
                                        if((tempI+1) <= this.fieldArray.length-1){
                                             this.fieldArray[i][tempI] = this.fieldArray[i][tempI+1];
                                             this.fieldArray[i][tempI+1] = 0;

                                        }
                                        else {
                                             this.fieldArray[i][tempI] = 0;
                                        }
                                        //alert(this.fieldArray[i][0] + ' ' + this.fieldArray[i][1] + ' ' + this.fieldArray[i][2] + ' ' + this.fieldArray[i][3] + ' j:' + tempI);
                                   }
                                   else{
                                        this.fieldArray[i][tempI-1] = this.fieldArray[i][tempI];
                                        this.fieldArray[i][tempI] = 0;

                                        if(stepsCountBool){
                                             stepI = i;
                                             stepJ = tempI;
                                             stepsCountBool = false;
                                        }
                                        stepsCount++;

                                   }
                                   tempI = tempI - 1;
                                   if(tempI == 0) break;
                              }
                         }

                         if(!stepsCountBool){
                              this.printPermission = false;
                              this.moveAnimation(stepI, stepJ, stepsCount, direction);
                         }
                         else{
                              if(this.printPermission){
                                   printField(this.fieldArray);
                              }
                              this.threadsFinished++;
                              if(this.threadsFinished == 12){
                                   this.printNewDigits();
                              }
                         }

                    }
               }

          }

          // following logic: 8 4 2 2 -> 8 4 4 -> 8 8 -> 16.
          // returns the number of steps
          this.takeSteps = function(direction, col){

               var steps = 4;
               var equalDigits = 0;
               var count = 0;
               var arr = [];

               if((direction == 'move up') || (direction == 'move down')){
                    for(var i = 0; i < this.fieldArray.length; i++){

                         if(this.fieldArray[i][col] == this.fieldArray[0][col]){
                              equalDigits++;
                         }
                         else equalDigits--;

                         if(this.fieldArray[i][col] != 0){
                              count++;
                         }
                         if(arr.indexOf(this.fieldArray[i][col]) == -1){
                              arr[arr.length] = this.fieldArray[i][col];
                              steps = steps - 1;
                         }
                    }
               }
               else if((direction == 'move right') || (direction == 'move left')){
                    for(var i = 0; i < this.fieldArray.length; i++){

                         if(this.fieldArray[col][i] == this.fieldArray[col][0]){
                              equalDigits++;
                         }
                         else equalDigits--;

                         if(this.fieldArray[col][i] != 0){
                              count++;
                              //alert(count);
                         }
                         if(arr.indexOf(this.fieldArray[col][i]) == -1){
                              arr[arr.length] = this.fieldArray[col][i];
                              steps = steps - 1;
                         }
                    }
               }

               if(steps == 3) steps--;
               if(arr.length == 2 && count == 4){
                    //steps--;
                    if(equalDigits != 0) steps--;
               }
               //alert(steps);
               return steps;

          }

          this.getChanges = function(){
               for(var i = 0; i < this.fieldArray.length; i++){
                    for(var j = 0; j < this.fieldArray[i].length; j++){
                         if(this.fieldArray[i][j] != this.tempFieldArray[i][j]){
                              return true;
                         }
                    }
               }
               return false;
          }

          this.getTempArray = function(){
               for(var i = 0; i < this.fieldArray.length; i++){
                    for(var j = 0; j < this.fieldArray[i].length; j++){
                         this.tempFieldArray[i][j] = this.fieldArray[i][j];
                    }
               }
          }

          this.newArray = function(){

               for(var i = 0; i < this.fieldArray.length; i++){
                    for(var j = 0; j < this.fieldArray[i].length; j++){
                         this.setValue(i, j, 0);
                         this.tempFieldArray[i][j] = 0;
                    }
               }

          }

          this.randomPositions = function(times){

               var min = 0;
               var max = 4;
               var x = 0;
               var y = 0;
               for(var i = 0; i < times; i++){
                    do {
                         x = parseInt(Math.random() * (max - min) + min);
                         y = parseInt(Math.random() * (max - min) + min);
                         //alert(x + ':' + y);
                    } while ((this.fieldArray[x][y] != 0) && (this.emptyCount() > 0));
                    if(this.emptyCount() > 0){
                         //alert('RESULT : ' + x + ':' + y);
                         this.newRandomX = x;
                         this.newRandomY = y;
                         this.setValue(x, y, this.getRandomValue());
                    }
                    /*
                    else if(this.checkGameOver()){
                         this.finishGame();
                    }
                    */
               }

          }

          this.setValue = function(x, y, value){
               this.fieldArray[x][y] = value;
          }

          this.checkWin = function(){

               for(var i = 0; i < this.fieldArray.length; i++){
                    for(var j = 0; j < this.fieldArray.length; j++){
                         if(this.fieldArray[i][j] == 2048){
                              if(!this.gameContinue){
                                   return true;
                              }
                         }
                    }
               }

               return false;

          }

          this.checkGameOver = function(){

               this.gameOver = true;
               var arr = this.fieldArray;
               // border positions
               if(arr[0][0] == arr[0][1] || arr[0][0] == arr[1][0]) this.gameOver = false;
               if(arr[3][0] == arr[3][1] || arr[3][0] == arr[2][0]) this.gameOver = false;
               if(arr[0][3] == arr[0][2] || arr[0][3] == arr[1][3]) this.gameOver = false;
               if(arr[3][3] == arr[2][3] || arr[3][3] == arr[3][2]) this.gameOver = false;

               // border lines
               for(var i = 1; i < arr.length-1; i++){
                    if(arr[0][i] == arr[0][i-1] || arr[0][i] == arr[0][i+1]) this.gameOver = false;
                    if(arr[3][i] == arr[3][i-1] || arr[3][i] == arr[3][i+1]) this.gameOver = false;
               }
               for(var i = 1; i < arr.length-1; i++){
                    if(arr[i][0] == arr[i-1][0] || arr[i][0] == arr[i+1][0]) this.gameOver = false;
                    if(arr[i][3] == arr[i-1][3] || arr[i][3] == arr[i+1][3]) this.gameOver = false;
               }

               // middle
               for(var i = 1; i < this.fieldArray.length-1; i++){
                    for(var j = 1; j < this.fieldArray.length-1; j++){
                         if(arr[i][j] == arr[i][j+1] || arr[i][j] == arr[i][j-1] || arr[i][j] == arr[i-1][j] || arr[i][j] == arr[i+1][j]) this.gameOver = false;
                    }
               }

               return this.gameOver;

          }

          // empty positons left, will help us with random
          this.emptyCount = function(){

               var empty = 0;
               for(var i = 0; i < this.fieldArray.length; i++){
                    for(var j = 0; j < this.fieldArray[i].length; j++){
                         if(this.fieldArray[i][j] === 0){
                              empty++;
                         }
                    }
               }

               return empty;

          }

          this.getRandomValue = function(){
               return Math.random() < 0.9 ? 2048 : 4;
          }


          // PRINTS

          var printField = function(array){
               //alert('print | printPermission: ' + game.printPermission);
               $('.game-container').css({'opacity':'1'});
               $('.game-container').empty();

               for(var i = 0; i < array.length; i++){
                    for(var j = 0; j < array[i].length; j++){
                         var container = $('.game-container');
                         if(array[i][j] === 0){
                              container.append("<div class='game-container-cell'></div>");
                         }
                         else{
                              //alert(game.newRandomX);
                              var style = '';
                              switch (array[i][j]) {
                                   case 4:
                                        style='background: #ede0c8; color: #000000;';
                                        break;
                                   case 8:
                                        style='background: #f2b179; color: #FFFFFF;';
                                        break;
                                   case 16:
                                        style='background: #f59563; color: #FFFFFF;';
                                        break;
                                   case 32:
                                        style='background: #f67c5f; color: #FFFFFF;';
                                        break;
                                   case 64:
                                        style='background: #f65e3b; color: #FFFFFF;';
                                        break;
                                   case 128:
                                        style='background: #edcf72; color: #FFFFFF; font-size: 50px;';
                                        break;
                                   case 256:
                                        style='background: #edcc61; color: #FFFFFF; font-size: 50px;';
                                        break;
                                   case 512:
                                        style='background: #edc850; color: #FFFFFF; font-size: 50px;';
                                        break;
                                   case 1024:
                                        style='background: #edc53f; color: #FFFFFF; font-size: 40px;';
                                        break;
                                   case 2048:
                                        style='background: #edc22e; color: #FFFFFF; font-size: 40px;';
                                        break;
                              }

                              if(((game.newRandomX == i) && (game.newRandomY == j))){
                                   container.append("<div class='game-container-cell'><div class='game-container-cell-digit' style='display:none;" + style + "' id='"+ i + "_" + j +"'>" + array[i][j] + "</div></div>");
                                   $('#' + game.newRandomX + '_' + game.newRandomY).fadeToggle('slow');
                                   //$('#' + game.newRandomX + '_' + game.newRandomY).css({'display':''});
                                   game.newRandomX = -1;
                                   game.newRandomY = -1;
                              }
                              else{
                                   container.append("<div class='game-container-cell'><div class='game-container-cell-digit' style='" + style + "' id='"+ i + "_" + j +"'>" + array[i][j] + "</div></div>");
                              }
                              //$('#' + i + '_' + j).fadeToggle('slow');
                         }
                    }
               }

          }

          this.printGameScore = function(){

               if(this.best < this.score){
                    this.best = this.score;
               }

               $('#gameScore').empty();
               $('#gameScore').append('<div class="game-container-results-title">score</div><div class="game-container-results-value">' + this.score + '</div>');

               $('#gameBest').empty();
               $('#gameBest').append('<div class="game-container-results-title">best</div><div class="game-container-results-value">' + this.best + '</div>');

          }

          this.printNewDigits = function(){
               if(game.getChanges()){
                    game.showNewPermisson = true;
                    game.randomPositions(1);
               }
               game.threadsFinished = 0;
               printField(game.fieldArray);
          }

          this.finishGame = function(content){

               $('.game-container').animate({'opacity':'0.6'}, 3000, function(){
                    var addButtons = '';
                    if(content == 'Game Over!'){
                         addButtons = '<a id="tryAgain" type="button" class="btn game-container-results-button-finish btn-lg">Try again</a>';
                    }
                    else{
                         addButtons = '<a id="tryContinue" type="button" class="btn game-container-results-button-finish btn-lg">Continue</a><a id="tryAgain" type="button" class="btn game-container-results-button-finish btn-lg">Try again</a>';
                    }
                    $('.game-container').append('<div class="game-container-finish">' + content + '<br/>' + addButtons +'</div>');
                    $('.game-container-finish').animate({'opacity':'0.8','line-height':'100px','position':'absolute'}, 500);
               });

          }

          // ANIMATION

          var callPrintFunction = function(){
               printField(game.fieldArray);
          }

          var changePrintPermission = function(){
               //alert('Changin print permission...');
               game.printPermission = true;
          }

          var afterAnimation = function(){

               callPrintFunction();
               changePrintPermission();
               game.threadsFinished++;
               if(game.threadsFinished == 12){    // 16 - one row or column
                    if(game.getChanges()){
                         game.showNewPermisson = true;
                         game.randomPositions(1);
                         game.updateCookie();
                    }
                    printField(game.fieldArray);
                    game.threadsFinished = 0;
               }

          }

          this.moveAnimation = function(x, y, count, direction){
               var id = "#" + x + "_" + y +"";
               var distance = 121 * count;
               switch (direction) {
                    case 'move up':
                         $(id).animate({'margin-top':'-='+ distance +'px'}, 100, (function(){
                              afterAnimation();
                         }));
                         break;
                    case 'move right':
                         $(id).animate({'margin-left':'+='+ distance +'px'}, 100, (function(){
                              afterAnimation();
                         }));
                         break;
                    case 'move down':
                         $(id).animate({'margin-top':'+='+ distance +'px'}, 100, (function(){
                              afterAnimation();
                         }));
                         break;
                    case 'move left':
                         $(id).animate({'margin-left':'-='+ distance +'px'}, 100, (function(){
                              afterAnimation();
                         }));
                         break;
                    default:
                         break;
               }
          }

          // CALCULATIONS

          function sleep(milliseconds) {
               var start = new Date().getTime();
               for (var i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds){
                         break;
                    }
               }
          }

          // FUNCTIONS

          function setCookie(name, value, options) {
                 options = options || {};

                 var expires = options.expires;

                 if (typeof expires == "number" && expires) {
                      var d = new Date();
                      d.setTime(d.getTime() + expires * 1000);
                      expires = options.expires = d;
                 }
                 if (expires && expires.toUTCString) {
                      options.expires = expires.toUTCString();
                 }

                 value = encodeURIComponent(value);

                 var updatedCookie = name + "=" + value;

                 for (var propName in options) {
                      updatedCookie += "; " + propName;
                      var propValue = options[propName];
                      if (propValue !== true) {
                           updatedCookie += "=" + propValue;
                      }
                 }

                 document.cookie = updatedCookie;
          }

          function getCookie(name) {
                 var matches = document.cookie.match(new RegExp(
                   "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                 ));
                 return matches ? decodeURIComponent(matches[1]) : undefined;
          }

     }

     var game = new Game();
     game.initial();

     // Events

     $('body').keydown(function(eventObject){

          if(!game.gameOver){
               game.move(game.keyMap[eventObject.which]);
          }

     });

     // New game button

     $('#newGameButton').click(function(){

          game.newGame();

     });

     // Try again button

     $(document).on("click", "#tryAgain", function () {

          game.newGame();

     });

     // Continue button

     $(document).on("click", "#tryContinue", function(){

          game.gameContinue = true;
          game.updateCookie();
          game.initial();

     });

});
