$(document).ready(function(){

     function Game(){

          this.score = 0;

          this.fieldArray = [
               [16, 2, 4, 4],
               [2, 2, 2, 4],
               [2, 2, 2, 0],
               [4, 2, 2, 2],
          ];

          this.tempFieldArray = [
               [16, 2, 4, 4],
               [2, 2, 2, 4],
               [2, 2, 2, 0],
               [4, 2, 2, 2],
          ];

          this.keyMap = {
            38: 0, // Up
            39: 1, // Right
            40: 2, // Down
            37: 3, // Left
            75: 0, // Vim up
            76: 1, // Vim right
            74: 2, // Vim down
            72: 3, // Vim left
            87: 0, // W
            68: 1, // D
            83: 2, // S
            65: 3  // A
          };

          this.initial = function(){

               this.score = 0;
               this.newArray();
               this.randomPositions(2);
               this.print();

          }

          this.move = function(direction){
               //alert('move');
               this.getTempArray();
               switch (direction) {
                    case 0:{  // up
                         //alert('0');
                         var i = 1;
                         for(var j = 0; j < this.fieldArray.length; j++){
                              var stepsFlag = true;
                              var steps = 0;
                              steps = this.takeSteps(direction, j); // 8 4 2 2, 8 4 4, 8 8, 16.
                              for(i = 1; i < this.fieldArray.length; i++){
                                   if(this.fieldArray[i][j] != 0){
                                        //alert('yes');
                                        var tempI = i;
                                        while(((this.fieldArray[tempI-1][j] == 0) || ((this.fieldArray[tempI-1][j] == this.fieldArray[tempI][j]) && (steps > 0))) && (tempI > 0)){
                                             if(this.fieldArray[tempI-1][j] == this.fieldArray[tempI][j]){
                                                  this.fieldArray[tempI-1][j] = this.fieldArray[tempI][j] * 2;
                                                  this.score = this.score + this.fieldArray[tempI-1][j];
                                                  this.printGameScore();
                                                  steps = steps - 1;
                                             }
                                             else{
                                                  this.fieldArray[tempI-1][j] = this.fieldArray[tempI][j];
                                             }
                                             this.fieldArray[tempI][j] = 0;
                                             tempI = tempI - 1;
                                             //alert('Array:' + this.fieldArray[tempI][j]);
                                             if(tempI == 0) break;
                                        }
                                   }
                                   this.print();
                              }
                         }
                         break;
                    }
                    default:
                         break;
               }

               if(this.getChanges()){
                    this.randomPositions(1);
               }
               this.print();

          }

          // following logic: 8 4 2 2 -> 8 4 4 -> 8 8 -> 16.
          this.takeSteps = function(direction, col){

               var steps = 2;
               var count = 0;
               var arr = [];
               switch (direction) {
                    case 0:{  // up
                         /*
                         for(var i = 0; i < this.fieldArray.length; i++){
                              if(this.fieldArray[i][col] == 0) count++;
                               //if(this.fieldArray[i][col] != 0){
                                   if(arr.indexOf(this.fieldArray[i][col]) == -1){
                                        arr[arr.length] = this.fieldArray[i][col];
                                   }
                              //}
                         }
                         */
                         for(var i = 0; i < this.fieldArray.length; i++){
                              if(this.fieldArray[i][col] == 0){
                                   steps = steps - 1;
                              }
                              else{
                                   count++;
                              }
                              if(arr.indexOf(this.fieldArray[i][col]) == -1){
                                   if(this.fieldArray[i][col] != 0){
                                        arr[arr.length] = this.fieldArray[i][col];
                                   }
                              }
                         }
                         break;
                    }
                    case 1:{  // right

                         break;
                    }
                    case 2:{  // down

                         break;
                    }
                    case 3:{  // left

                         break;
                    }
                    default:
                         break;
               }

               /*
               switch (arr.length) {
                    case 0:
                         steps = 0;
                         break;
                    case 1:        // 8 8 8 8
                    case 2:        // 8 8 4 4 | 8 4 8 4 | 0 2 2 4
                         steps = 2;
                         break;
                    case 3:        // 8 4 4 2 | 8 4 2 2
                         steps = 1;
                         break;
                    case 4:
                         steps = 0;
                         break;
               }
               */
               //if(count == 0) steps = 1;
               //alert(steps + ' ' + col);
               /*
               var printString = '';
               for(var i = 0; i < arr.length; i++){
                    printString = printString + ' ' + arr[i];
               }
               */
               //alert(printString);
               if((arr.length == 1) && (count == 2)){
               //     alert('sd');
                    steps = 1;
               }
               else if((arr.length == 2) && (count == 2)){
                    steps = 2;
               }
               else if((arr.length == 2) && (count == 4)){
                    steps = 1;
               }
               else if((arr.length == 3) && ((count == 4))){
                    steps = 1;
               }
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
               return Math.random() < 0.9 ? 2 : 4;
          }

          this.print = function(){
               //alert('print');
               $('.game-container').empty();
               for(var i = 0; i < this.fieldArray.length; i++){
                    for(var j = 0; j < this.fieldArray[i].length; j++){
                         var container = $('.game-container');
                         if(this.fieldArray[i][j] === 0){
                              container.append("<div class='game-container-cell'></div>");
                         }
                         else{
                              container.append("<div class='game-container-cell-digit'>" + this.fieldArray[i][j] + "</div>");
                         }
                    }
               }

          }

          this.printGameScore = function(){

               $('#gameScore').empty();
               $('#gameScore').append('Score: ' + this.score);

          }

     }

     var game = new Game();
     game.initial();

     // Events

     $('body').keydown(function(eventObject){

          //if(game.emptyCount() > 0){
               switch (game.keyMap[eventObject.which]) {
                    case 0:{  // up
                         game.move(0);
                         break;
                    }
                    case 1:{  // right
                         game.move(1);
                         break;
                    }
                    case 2:{  // down
                         game.move(2);
                         break;
                    }
                    case 3:{  // left
                         game.move(3);
                         break;
                    }
               }
          //}

     });

     // New game

     $('#newGameButton').click(function(){
          game.initial();
     });

});
