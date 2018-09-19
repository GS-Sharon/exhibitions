/*
* @Author: name
* @Date:   2018-07-23 10:58:50
* @Last Modified by:   name
* @Last Modified time: 2018-07-25 20:49:21
*/

'use strict';
(function() {
    window.SceneManager = function(sceneIndex,game) {
        this.game = game;
        this.sceneIndex = sceneIndex;
        this.canvas = this.game.canvas;
        this.init();
        this.render();
        this.eventBind();
    }
    SceneManager.prototype = {
        init: function() {
            switch(this.sceneIndex) {
                //1号场景
                case 1:
                    this.Background = new Background(this.game);
                    this.Land = new Land(this.game);
                    this.topPic = this.game.res['endTopPic'];
                    this.birds = [this.game.res['endBird1'],this.game.res['endBird2'],this.game.res['endBird3']];
                    this.middleBut = this.game.res['button_play'];
                    this.topY = -62;
                    this.middleY = this.game.canvas.height / 2 - 50;
                break;

                case 2:
                    this.Background = new Background(this.game);
                    this.Land = new Land(this.game);
                    this.topPic = this.game.res['ready'];
                    this.middlePic = this.game.res['tutorial'];
                    this.topY = -62;
                    this.middleY = this.game.canvas.height / 2 - 35;
                    this.opacity = 1;
                    this.opacitySpace = -0.01;
                break;

                case 3:
                    this.Background = new Background(this.game);
                    this.Land = new Land(this.game);
                    this.Pipe = new Pipe(this.game);
                    this.Bird = new Bird(this.game);
                break;

            }
        },
        render: function() {
            switch(this.sceneIndex) {
                case 1:
                    var self = this;
                    setTimeout(function() {
                        clearInterval(self.game.endTimer);
                        // 重绑事件
                        self.eventBind();
                        // 渲染游戏背景
                        var f = 0;
                        self.timer1 = setInterval(function() {
                            f++;
                            self.game.clear();
                            self.Background.render();
                            self.Land.render();
                            // 初始化展示图片的位置
                            self.game.ctx.drawImage(self.topPic, (self.game.canvas.width - 196) / 2 , self.topY);
                            if(f % 4 == 0) {
                                self.topY = self.topY >= 100 ? 100 : ++self.topY;
                                self.Background.bgMoveFn();
                                self.Land.bgMoveFn();
                                // 初始化展示图片的位置
                                self.game.ctx.drawImage(self.topPic, (self.game.canvas.width - 196) / 2 , self.topY);
                            }
                            self.game.ctx.drawImage(self.middleBut, (self.game.canvas.width - 116) / 2, self.middleY);
                        },5);
                    },1000);

                break;
                case 2:
                    // 渲染游戏背景
                    var self = this,
                        f = 0;
                    this.timer2 = setInterval(function() {
                        f++;
                        self.game.clear();
                        self.Background.render();
                        self.Land.render();
                        // 初始化展示图片的位置
                        self.game.ctx.drawImage(self.topPic, (self.game.canvas.width - 196) / 2 , self.topY);
                        if(f % 4 == 0) {
                            self.topY = self.topY >= 100 ? 100 : ++self.topY;
                            self.Background.bgMoveFn();
                            self.Land.bgMoveFn();
                            // 初始化展示图片的位置
                            self.game.ctx.drawImage(self.topPic, (self.game.canvas.width - 196) / 2 , self.topY);
                        }
                        self.game.ctx.save();

                        if(self.opacity <= 0.02 || self.opacity > 1) {
                            self.opacitySpace = -self.opacitySpace;
                        }
                        self.opacity += self.opacitySpace;
                        self.game.ctx.globalAlpha = self.opacity;
                        self.game.ctx.drawImage(self.middlePic, (self.game.canvas.width - 114) / 2, self.middleY);
                        self.game.ctx.restore();
                    },5);

                break;
                case 3:
                    var self = this;
                    this.game.f = 0;
                    this.game.timer = setInterval(function() {
                        self.game.f++;
                        self.game.clear();
                        self.Background.bgMoveFn();
                        self.Land.bgMoveFn();
                        self.game.f % 300 == 0 && new Pipe(self.game);
                        for (var i = 0; i < self.game.pipes.length; i++) {
                            self.game.pipes[i].pipeMoveFn();
                        }
                        self.Bird.birdChange(self.game.f % 3);
                    }, 10);
                break;
            }
        },
        eventBind: function() {

            var self = this;
            // 绑定事件
            document.onkeydown = function(e) {
                if (e.keyCode == 38) {
                    self.Bird.birdFly();
                }
            }
            this.canvas.onclick = function(e) {
                switch(self.sceneIndex) {
                    case 1:
                        //判断当前场景是场景1
                        //检测鼠标位置
                        var clientX = e.clientX;
                        var clientY = e.clientY;
                        if(clientX >= (self.game.canvas.width - 114) / 2 && clientX <= self.game.canvas.width + 57 && clientY >= self.middleY && clientY <= self.middleY + 70) {
                            clearInterval(self.timer1);
                            //点击了开始,将进入场景2
                            self.game.pipes = [];
                            self.sceneIndex = 2;
                            self.init();
                            self.render();
                            self.eventBind();
                        }

                    break;
                    case 2:
                        //判断当前场景是场景2
                        //检测鼠标位置
                        var clientX = e.clientX;
                        var clientY = e.clientY;
                        if(clientX >= (self.game.canvas.width - 114) / 2 && clientX <= self.game.canvas.width + 57 && clientY >= self.middleY && clientY <= self.middleY + 100) {
                            clearInterval(self.timer2);
                            //点击了开始,将进入场景3
                            self.sceneIndex = 3;
                            self.init();
                            self.render();
                            self.eventBind();
                        }
                    break;
                    case 3:
                        self.Bird.birdFly();
                    break;
                }
            }
        }
    }




})();