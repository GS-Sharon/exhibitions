/*
* @Author: name
* @Date:   2018-07-19 11:30:26
* @Last Modified by:   name
* @Last Modified time: 2018-07-19 21:17:56
*/

'use strict';
(function() {
    window.Snake = function (game) {
        this.game = game;
        this.arr = [
            {"row" : 4,"col" : 5},
            {"row" : 4,"col" : 4},
            {"row" : 4,"col" : 3},
            {"row" : 4,"col" : 2}
        ];
        this.direction = "R";
        this.rowPace = 0;
        this.colPace = 1;

    }
    Snake.prototype = {
        render: function() {
            for(var i=0; i<this.arr.length; i++) {
                this.game.renderColor(this.arr[i].row,this.arr[i].col);
            }
        },
        changeDirection: function() {
            var self = this;
            document.onkeydown = function(e) {
                if(e.keyCode == 37 && self.direction != "R") {
                    // 向左
                    self.direction = "L";
                    self.rowPace = 0;
                    self.colPace = -1;
                } else if(e.keyCode == 39 && self.direction != "L") {
                    // 向右
                    self.direction = "R";
                    self.rowPace = 0;
                    self.colPace = 1;
                } else if(e.keyCode == 38 && self.direction != "B") {
                    // 向上
                    self.direction = "T";
                    self.rowPace = -1;
                    self.colPace = 0;
                } else if(e.keyCode == 40 && self.direction != "T") {
                    // 向下
                    self.direction = "B";
                    self.rowPace = 1;
                    self.colPace = 0;
                }
            }
        },
        move: function() {
            this.game.clear(this.arr[this.arr.length-1].row,this.arr[this.arr.length-1].col);
            var deleteEle = this.eat(this.arr[0].row,this.arr[0].col) ? this.arr.pop() : null;
            // 撞墙
            if(this.arr[0].row > this.game.row - 1
                || this.arr[0].row < 0
                || this.arr[0].col > this.game.col - 1
                || this.arr[0].col < 0
            ) {
                clearInterval(this.game.timer);
                this.arr.unshift(deleteEle);
                this.render();
                alert("游戏结束，长度为：" + this.arr.length);
                return;
            }
            //自杀
            for(var i=1; i<this.arr.length; i++) {
                if(this.arr[0].row == this.arr[i].row && this.arr[0].col == this.arr[i].col) {
                    alert("游戏结束，长度为：" + this.arr.length);
                    clearInterval(this.game.timer);
                    return;
                }
            }
            this.arr.unshift({"row":this.arr[0].row + this.rowPace,"col":this.arr[0].col + this.colPace});
            this.render();
        },
        eat: function(x,y) {
            if(x == this.game.Food.x && y == this.game.Food.y) {
                this.game.clearFood(x,y);
                this.game.Food = new Food(this.game);
                this.game.Food.init();
                return false;
            } else {
                return true;
            }
        }

    }
})();