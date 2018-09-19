/*
* @Author: name
* @Date:   2018-07-23 03:12:49
* @Last Modified by:   name
* @Last Modified time: 2018-07-24 18:05:15
*/

'use strict';
(function(){
    window.Crash = function(game) {
        this.game = game;
        this.x = this.game.SceneManager.Bird.x;
        this.y = this.game.SceneManager.Bird.y;
        this.imgs = [];
        this.opacity = 0.5;
        this.opacitySpace = -0.02;
        this.init();
    }
    Crash.prototype = {
        init: function() {
            for(var i=1; i<12; i++) {
                this.imgs.push(this.game.res['crash' + i]);
            }

        },
        render: function(index) {
            this.game.ctx.save();
            // 改变透明度
            if(this.opacity <= 0.1 || this.opacity > 0.5) {
                this.opacitySpace = -this.opacitySpace;
            }
            this.opacity += this.opacitySpace;

            this.game.ctx.globalAlpha = this.opacity;
            this.game.ctx.drawImage(this.game.res['gameoverBg'], 0, 0 , this.game.canvas.width , this.game.canvas.height);
            this.game.ctx.restore();
            this.game.ctx.drawImage(this.imgs[index], this.x - 36, this.y - 80);
        }
    }
})();