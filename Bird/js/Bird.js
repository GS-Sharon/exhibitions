/*
* @Author: name
* @Date:   2018-07-22 20:50:36
* @Last Modified by:   name
* @Last Modified time: 2018-07-23 14:09:03
*/

'use strict';
(function() {
    window.Bird = function(game) {
        var self = this;
        this.game = game;
        // 设置小鸟的位置
        this.x = this.game.canvas.width / 2;
        this.y = this.game.canvas.height* 0.618 / 2;
        // 获取小鸟的图片资源
        this.birds =[
            self.game.res['bird1'],
            self.game.res['bird2'],
            self.game.res['bird3']
        ];
        // 小鸟当前状态展示图
        this.img = this.birds[0];
        // 小鸟下落的加速度
        this.jerk = 0.01;
        // 小鸟下落旋转的弧度
        this.rad = 0;

        this.render();
    }
    Bird.prototype = {
        render: function() {
            this.game.ctx.save();
            this.game.ctx.translate(this.x,this.y);
            this.game.ctx.rotate(this.rad);
            this.game.ctx.drawImage(this.img, -24 , -24);
            this.game.ctx.restore();
        },
        birdFall: function() {
            this.jerk = this.jerk >= 0.5 ? 0.5 : this.jerk + 0.05;
            this.y += this.jerk;
            this.rad = this.rad <= Math.PI/4 ? this.rad + 0.02 : this.rad;
        },
        birdFly: function() {
            this.y -= 20;
            this.rad = this.rad >=0.01 ? this.rad - 0.2 : this.rad;
        },
        birdChange: function(index){
            this.img = this.birds[index];
            this.birdFall();
            this.render();
        }
    }
})();