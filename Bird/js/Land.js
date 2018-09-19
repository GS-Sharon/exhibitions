/*
* @Author: name
* @Date:   2018-07-22 19:12:19
* @Last Modified by:   name
* @Last Modified time: 2018-07-22 19:26:39
*/

'use strict';
(function() {
    window.Land = function(game) {
        this.game = game;
        // 设置地面的位置
        this.x = 0;
        this.y = this.game.canvas.height - 112;
        this.img = this.game.res['land'];
        this.render();
    }
    Land.prototype = {
        render: function() {
            this.game.ctx.drawImage(this.img, this.x, this.y);
            this.game.ctx.drawImage(this.img, this.x + 336, this.y);
        },
        bgMove: function() {
            this.x -= 1;
            if(this.x <= -this.game.canvas.width + 336) {
                this.x = 0;
            }
        },
        bgMoveFn: function() {
            this.bgMove();
            this.render();
        }
    };
})();