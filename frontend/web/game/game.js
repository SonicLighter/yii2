$(document).ready(function(){

     function Game(){

          this.fieldArray = [
               [1, 1, 1, 2],
               [1, 3, 1, 3],
               [1, 3, 0, 1],
               [3, 1, 3, 4],
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

               this.newArray();
               this.randomPositions(1);
               this.print();

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

     }

     var game = new Game();
     game.initial();

     // Events

     $('body').keydown(function(eventObject){

          if(game.emptyCount() > 0){
               switch (game.keyMap[eventObject.which]) {
                    case 0:{  // up

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
               }
          }

     });

});
