/*
* @Author: name
* @Date:   2018-07-22 15:44:05
* @Last Modified by:   name
* @Last Modified time: 2018-07-24 21:14:29
*/

'use strict';
(function() {
    window.Game = function() {
        // 图片资源
        this.res = [];
        this.canvas = document.getElementById("box");
        this.ctx = null;
        // 预加载图片
        this.init();
        // 管道集合
        this.pipes = [];
    }
    Game.prototype = {
        init: function() {
            var self = this;
            // 设置游戏的上下文
            this.ctx = this.canvas.getContext("2d");
            //预加载图片资源
            var res = {
                // 场景1所需图片
                "endTopPic": "images/title.png",
                "endBird1": "images/bird1_0.png",
                "endBird2": "images/bird1_1.png",
                "endBird3": "images/bird1_2.png",
                "button_play": "images/button_play.png",
                // 场景2所需图片
                "ready": "images/text_ready.png",
                "tutorial": "images/tutorial.png",
                // 场景3所需图片
                "bgPic": "images/bg_day.png",
                "bird1": "images/bird0_0.png",
                "bird2": "images/bird0_1.png",
                "bird3": "images/bird0_2.png",
                "land": "images/land.png",
                'pipeUp': "images/pipe_down.png",
                'pipeDown': "images/pipe_up.png",
                // 场景4所需图片
                'crash1': "images/b0.png",
                'crash2': "images/b1.png",
                'crash3': "images/b2.png",
                'crash4': "images/b3.png",
                'crash5': "images/b4.png",
                'crash6': "images/b5.png",
                'crash7': "images/b6.png",
                'crash8': "images/b7.png",
                'crash9': "images/b8.png",
                'crash10': "images/b9.png",
                'crash11': "images/b10.png",
                'crash12': "images/b11.png",
                'gameoverBg': "images/gameoverbg.png",
            }
            for(var key in res) {
                var img = new Image();
                img.src = res[key];
                this.res[key] = img;
                var length = Object.keys(this.res).length;
                var count = 0;
                img.onload = function() {
                    ++count;
                    // 图片全部预加载成功
                    if(count == length) {
                        //游戏开始
                        self.start();
                    }
                }
            }
        },
        clear: function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        eventBind: function() {
            this.bird.birdFly();
        },
        start: function() {
            var self = this;
            this.SceneManager = new SceneManager(2,this);

        },
        crashStart: function() {
            clearInterval(this.timer);
            this.Crash = new Crash(this);
            var f = 0,
                self = this;
            this.endTimer = setInterval(function(){
                f++;
                self.clear();
                self.SceneManager.Background.render();
                self.SceneManager.Land.render();
                for(var i=0; i<self.pipes.length; i++) {
                    self.pipes[i].render();
                }
                self.SceneManager.Bird.render();
                document.onkeydown = null;
                self.canvas.onclick = null;
                self.Crash.render(f % 11);

            },20);
        }
    }
})();