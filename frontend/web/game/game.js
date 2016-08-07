$(document).ready(function(){

     function Game(){

          this.score = 0;
          this.printPermission = true;

          this.threadsFinished = 0;

          // new values
          this.newRandomX = -1;
          this.newRandomY = -1;
          this.showNewPermisson = true;

          this.fieldArray = [
               [0, 0, 0, 4],
               [0, 0, 0, 4],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
          ];

          this.tempFieldArray = [
               [16, 2, 4, 4],
               [4, 2, 2, 2],
               [2, 2, 2, 0],
               [4, 2, 2, 2],
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

               this.score = 0;
               this.printGameScore();
               this.newArray();
               this.randomPositions(2);
               printField(this.fieldArray);

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

               /*
               if(this.getChanges()){
                    sleep(100);    // wait until animation not finished
                    alert('new digit');
                    this.showNewPermisson = true;
                    this.randomPositions(1);
               }

               if(this.printPermission){
                    printField(this.fieldArray);
               }
               */

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
               }

          }

          this.setValue = function(x, y, value){
               this.fieldArray[x][y] = value;
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
               //alert('hi');
               return Math.random() < 0.9 ? 2 : 4;
          }


          // PRINTS

          var printField = function(array){
               //alert('print | printPermission: ' + game.printPermission);
               $('.game-container').empty();
               for(var i = 0; i < array.length; i++){
                    for(var j = 0; j < array[i].length; j++){
                         var container = $('.game-container');
                         if(array[i][j] === 0){
                              container.append("<div class='game-container-cell'></div>");
                         }
                         else{
                              //alert(game.newRandomX);
                              if(((game.newRandomX == i) && (game.newRandomY == j))){
                                   container.append("<div class='game-container-cell'><div class='game-container-cell-digit' style='display:none' id='"+ i + "_" + j +"'>" + array[i][j] + "</div></div>");
                                   $('#' + game.newRandomX + '_' + game.newRandomY).fadeToggle('slow');
                                   //$('#' + game.newRandomX + '_' + game.newRandomY).css({'display':''});
                                   game.newRandomX = -1;
                                   game.newRandomY = -1;
                              }
                              else{
                                   container.append("<div class='game-container-cell'><div class='game-container-cell-digit' id='"+ i + "_" + j +"'>" + array[i][j] + "</div></div>");
                              }
                              //$('#' + i + '_' + j).fadeToggle('slow');
                         }
                    }
               }

               //if(game.newRandomX != -1 && game.printPermission){
                    //alert('sdasdas');
               //     $('#' + game.newRandomX + '_' + game.newRandomY).fadeToggle('slow');
               //       game.newRandomX = -1;
               //}

          }

          this.printGameScore = function(){

               $('#gameScore').empty();
               $('#gameScore').append('Score: ' + this.score);

          }

          this.printNewDigits = function(){
               if(game.getChanges()){
                    //alert('new digit');
                    game.showNewPermisson = true;
                    game.randomPositions(1);
               }
               game.threadsFinished = 0;
               //if(game.printPermission){
               printField(game.fieldArray);
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
               //alert(game.threadsFinished);
               if(game.threadsFinished == 12){    // 16 - one row or column
                    if(game.getChanges()){
                         //alert('new digit');
                         game.showNewPermisson = true;
                         game.randomPositions(1);
                    }
                    //if(game.printPermission){
                         printField(game.fieldArray);
                    //}
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

     }

     var game = new Game();
     game.initial();

     // Events

     $('body').keydown(function(eventObject){

          game.move(game.keyMap[eventObject.which]);

     });

     // New game button

     $('#newGameButton').click(function(){

          game.initial();

     });

});
