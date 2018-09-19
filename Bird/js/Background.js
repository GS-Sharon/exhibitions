/*
* @Author: name
* @Date:   2018-07-22 17:22:44
* @Last Modified by:   name
* @Last Modified time: 2018-07-22 20:50:55
*/

'use strict';
(function() {
    window.Background = function(game) {
        this.game = game;
        // 设置背景的起点
        this.x = 0;
        this.y = 0;
        // canvas的高和宽
        this.width = this.game.canvas.width;
        this.height = this.game.canvas.height;

        // 背景图片资源获取
        this.img = this.game.res['bgPic'];
        this.render();
    }
    Background.prototype = {
        render: function() {
            // 绘制天空
            this.game.ctx.save();
            this.game.ctx.fillStyle = "#4EC0CA";
            this.game.ctx.fillRect(0, 0, this.width, this.height - 512);
            this.game.ctx.restore();
            // 渲染初始背景
            this.game.ctx.drawImage(this.img, this.x, this.height - 512);
            this.game.ctx.drawImage(this.img, this.x + 288, this.height - 512);
            this.game.ctx.drawImage(this.img, this.x + 288*2, this.height - 512);
        },
        bgMove: function() {
            this.x -= 1;
            if(this.x <= -this.width + 288) {
                this.x = 0;
            }
        },
        bgMoveFn: function() {
            this.bgMove();
            this.render();

        }
    }
})();