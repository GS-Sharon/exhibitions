/*
* @Author: name
* @Date:   2018-07-19 11:30:35
* @Last Modified by:   name
* @Last Modified time: 2018-07-19 21:16:38
*/

'use strict';
function Food(game) {
    this.game = game;
    this.x = parseInt(Math.random() * this.game.col);
    this.y = parseInt(Math.random() * this.game.row);
}
Food.prototype = {
    init: function() {
        for(var i=0; i<this.game.Snake.arr.length; i++) {
            if(this.x == this.game.Snake.arr[i].row && this.y == this.game.Snake.arr[i].col) {
                this.x = parseInt(Math.random() * this.game.col);
                this.y = parseInt(Math.random() * this.game.row);
                i = 0;
            }
        }
        this.game.dom.getElementsByTagName("tr")[this.x].getElementsByTagName("td")[this.y].innerHTML = "●";
    }
}