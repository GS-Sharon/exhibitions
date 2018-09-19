/*
* @Author: name
* @Date:   2018-07-19 11:08:07
* @Last Modified by:   name
* @Last Modified time: 2018-07-19 21:16:53
*/

'use strict';
(function() {
    window.Game = function (row,col) {
        this.row = row;
        this.col =col;
        this.init();
        this.Food = new Food(this);
        this.Snake = new Snake(this);
        this.Food.init();
        this.Snake.render();
        this.Snake.changeDirection();
        this.start();
    }
    Game.prototype = {
        init: function() {
            this.dom = document.createElement("table");
            this.dom.row = this.row;
            this.dom.col = this.col;
            document.getElementById("box").appendChild(this.dom);
            for(var i=0; i<this.row; i++) {
                var tr = document.createElement("tr");
                for(var j=0; j<this.col; j++) {
                    tr.appendChild(document.createElement("td"));
                }
                this.dom.appendChild(tr);
            }
        },
        renderColor: function(tr,td){
            this.dom.getElementsByTagName("tr")[tr].getElementsByTagName("td")[td].style.backgroundColor = "red";
        },
        clear: function(tr,td){
            this.dom.getElementsByTagName("tr")[tr].getElementsByTagName("td")[td].style.backgroundColor = "white";
        },
        clearFood: function(tr,td) {
            this.dom.getElementsByTagName("tr")[tr].getElementsByTagName("td")[td].innerHTML = "";
        },
        start: function() {
            var self = this;
            var f = 0;
            this.timer = setInterval(function() {
                f++;
                if(self.Snake.arr.length <= 30) {
                    f % (20-self.Snake.arr.length) ==0 && self.Snake.move();
                } else {
                    f % 1 ==0 && self.Snake.move();
                }

            },20);

        }

    }
})();