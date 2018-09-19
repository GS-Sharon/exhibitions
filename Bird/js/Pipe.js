/*
* @Author: name
* @Date:   2018-07-22 19:33:39
* @Last Modified by:   name
* @Last Modified time: 2018-07-24 20:43:53
*/

'use strict';
(function() {
    window.Pipe = function(game) {
        this.game = game;
        // 设置管道的位置
        this.x = this.game.canvas.width;
        this.y = 0;
        // 获取管道的图片
        this.imgUp = this.game.res['pipeUp'];
        this.imgDown = this.game.res['pipeDown'];
        // 设置上下管道之间的间隙
        this.space = 100;
        this.space = 100 / (this.game.f+1) * Math.pow(10,3) >= 100 ? 100 / (this.game.f+1) * Math.pow(10,3) : 100;
        // 上管道的高度
        this.pipeUpH = _.random(100,350);
        // 下管道高度
        this.pipeDownH = this.game.canvas.height - 112 - this.pipeUpH - this.space;
        this.render();
        this.game.pipes.push(this);
    }
    Pipe.prototype = {
        render: function() {
            //参数：图片、图片x、图片y、图片宽、图片高、切片x、切片y、切片宽、切片高
            //设置上管道
            this.game.ctx.drawImage(this.imgUp, 0, 400 - this.pipeUpH ,52,this.pipeUpH, this.x , this.y,52,this.pipeUpH);
            // 设置下管道
            this.game.ctx.drawImage(this.imgDown, 0, 0,52,this.pipeDownH, this.x, this.space + this.pipeUpH ,52, this.pipeDownH);
        },
        pipeMove: function() {
            this.x -= 1;
            if(this.x <= -52) {
                this.goDie();
            }
        },
        goDie: function() {
            for(var i=0; i<this.game.pipes.length; i++) {
                if(this.game.pipes[i] == this) {
                    this.game.pipes.splice(i,1);
                }
            }
        },
        checkCrash: function() {
            if(this.game.SceneManager.Bird.x >=this.x && this.game.SceneManager.Bird.x <= this.x + 52
            && (this.game.SceneManager.Bird.y <=this.pipeUpH || this.game.SceneManager.Bird.y >=this.pipeUpH + this.space ) ) {
                this.game.crashStart();
                // 游戏结束后进入场景1
                this.game.SceneManager.sceneIndex = 1;
                this.game.SceneManager.init();
                this.game.SceneManager.render();
                this.game.SceneManager.eventBind();
            }
        },
        pipeMoveFn: function() {
            this.pipeMove();
            this.render();
            this.checkCrash();
        }

    }
})();