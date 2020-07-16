var stageScene = document.querySelector(".stage");
var gameScene = stageScene.querySelector(".game");
var startButton = stageScene.querySelector(".start button");
var restartButton = gameScene.querySelector(".restart");
var paylifeButton = gameScene.querySelector(".paylife");
var scoreDOM = gameScene.querySelector(".score");


var score = 0
// 初始化游戏场景背景定位
var gameScenePosY = 0;
// 初始化游戏暂停状态
var gamePausedState = false;
var gameDeathState = false;
// 保存定时器返回的id
var gameFrameId;
var gameFrames = 0;



var enemyPlaneS = {
  imgSrc: 'enemy-plane-s.png',
  w: 34,
  h: 24,
  speed: 5,
  classname: 'enemyPlaneS'
}
var enemyPlaneM = {
  imgSrc: 'enemy-plane-m.png',
  w: 46,
  h: 60,
  speed: 3,
  classname: 'enemyPlaneM'
}
var enemyPlaneL = {
  imgSrc: 'enemy-plane-l.png',
  w: 110,
  h: 164,
  speed: 1,
  classname: 'enemyPlaneL'
}
var bullet = {
  imgSrc: 'our-bullet.png',
  w: 6,
  h: 14,
  speed: -10,
  classname: 'bullet'
}

// 子弹 敌方飞机
function Element(params) {
  this.imgSrc = params.imgSrc;
  this.w = params.w
  this.h = params.h
  this.x = params.x;
  this.y = params.y;
  this.speed = params.speed
  this.classname = params.classname
}

Element.prototype.create = function () {
  this.node = document.createElement("img");
  this.node.src = "./images/" + this.imgSrc;
  this.node.style.left = this.x - this.w / 2 + "px";
  this.node.style.top = this.y - this.h / 2 + "px";
  this.node.classList.add(this.classname)

  gameScene.appendChild(this.node);
}

Element.prototype.move = function () {
  this.y += this.speed
  // 判断是否超出画布 垂直方向
  var topOutRange = this.y < -this.h / 2
  var bottomOutRange = this.y > 640 + this.h / 2
  if (topOutRange || bottomOutRange) {
    // 超出画布 相当于死亡
    this.death = true
  }
  this.node.style.top = this.y - this.h / 2 + "px";

}


// 保存战斗机
var ourPlane = {
  node: gameScene.querySelector(".our-plane"),
  w: 66,
  h: 80,
  x: 360 / 2,
  y: 640 - 80 / 2 - 20,
  bullets: [],
  // 保存所有子弹
};

// 保存所有敌方飞机
var enemies = []


// 随机数生成敌方飞机 x轴的位置
function randomNum() {
  return Math.round(Math.random() * gameScene.offsetWidth)
}

/* 游戏主体 */
// 更新动画帧的方法
function updataFrame() {
  // 动画帧 返回定时器id
  return setInterval(function () {
    // 更新帧数
    gameFrames++;

    // 更新背景
    gameScene.style.backgroundPositionY = ++gameScenePosY + "px";

    // 每一帧检测死亡状态
    if (gameDeathState) {
      // 如果死亡 暂停游戏
      gamePause();
      // 显示死亡视图
      stageScene.classList.add("death");
      // clearInterval(createboom)
    }

    // 动态创建子弹
    if (gameFrames % 10 === 0) {
      var newBullet = new Element(Object.assign(bullet, { x: ourPlane.x, y: ourPlane.y }));
      // console.log(newBullet)
      newBullet.create();
      ourPlane.bullets.push(newBullet);
    }

    // 每帧都移动【所有】子弹 ourPlane.bullets所有子弹
    ourPlane.bullets.forEach(function (bullet, index, bullets) {
      // 实例对象的方法
      bullet.move();
      // 顺便判断是否超出画布
      if (bullet.death) {
        // 超出画布  1 删除节点 2 从数组里面删除
        gameScene.removeChild(bullet.node);
        bullets.splice(index, 1);
      }
    });

    // 每隔多少帧  就创建 敌方飞机
    if (gameFrames % 800 === 0) {
      var newEnemy = new Element(Object.assign(enemyPlaneL, { x: randomNum(), y: -enemyPlaneL.h / 2 }))
      newEnemy.create();
      enemies.push(newEnemy);
    }
    if (gameFrames % 400 === 0) {
      var newEnemy = new Element(Object.assign(enemyPlaneM, { x: randomNum(), y: -enemyPlaneM.h / 2 }))
      newEnemy.create();
      enemies.push(newEnemy);
    }
    if (gameFrames % 100 === 0) {
      //随机生成 大中小飞机
      var newEnemy = new Element(Object.assign(enemyPlaneS, { x: randomNum(), y: -enemyPlaneS.h / 2 }))
      newEnemy.create();
      enemies.push(newEnemy);
    }
    // 每帧都移动【所有】敌机 
    enemies.forEach(function (enemy, index, enemies) {
      // 实例对象的方法
      enemy.move();
      // 顺便判断是否超出画布
      if (enemy.death) {
        // 超出画布  1 删除节点 2 从数组里面删除
        // enemy.src = './images/enemy-plane-s-boom.gif'

        // gameScene.removeChild(enemy.node);
        // enemies.splice(index, 1);
      }
    });


    // 每帧都检测碰撞 所有敌方飞机  所有子弹  还有 战斗机机碰撞
    enemies.forEach(function (enemy, indexE, enemies) {
      // 我方子弹
      ourPlane.bullets.forEach(function (bullet, indexB, bullets) {
        if (checkCollision(bullet, enemy)) {
          // 碰撞到了
          // console.log(bullet, enemy)
          // gamePause()
          bullet.death = true
          enemy.death = true
          var enemyPlaneS = document.getElementsByClassName('enemyPlaneS');
          for (i = 0; i < enemyPlaneS.length; i++) {
            enemyPlaneS[i].src = './images/enemy-plane-s-boom.gif'
          }
          var enemyPlaneM = document.getElementsByClassName('enemyPlaneM');
          for (i = 0; i < enemyPlaneM.length; i++) {
            enemyPlaneM[i].src = './images/enemy-plane-m-boom.gif'
          }
          var enemyPlaneL = document.getElementsByClassName('enemyPlaneL');
          for (i = 0; i < enemyPlaneL.length; i++) {
            enemyPlaneL[i].src = './images/enemy-plane-l-boom.gif'
          }
          score++

          ding()

        }
      })

      // 碰撞
      if (checkCollision(enemy, ourPlane)) {
        enemy.death = true
        score++
         document.querySelector('.our-plane').src='./images/our-plane-boom.gif'
        gameDeathState = true
      }
    })


    // 每一帧都更新一下score
    scoreDOM.innerText = score
  }, 30);
}

// 点击开始游戏


// 游戏播放
function gamePlay() {
  // 切换游戏暂停状态
  stageScene.classList.remove("paused");
  // 更改游戏状态
  gamePausedState = false;
  // 开始游戏 创建定时器
  gameFrameId = updataFrame();
}

// 游戏暂停
function gamePause() {
  stageScene.classList.add("paused");
  gamePausedState = true;
  // 清除定时器
  clearInterval(gameFrameId);
}

// 切换暂停游戏
gameScene.onclick = function () {
  // 判断游戏暂停状态
  if (gamePausedState) {
    gamePlay();
  } else {
    gamePause();
  }
  
};


startButton.onclick = function () {
  // 切换场景
  stageScene.classList.add("play");

  // 游戏开始
  gameFrameId = updataFrame();
};

// gameFrameId = updataFrame();

// 重新开始
restartButton.onclick = function () {
  // 刷新页面
  window.location.reload();
};

paylifeButton.onclick = function () {
  console.log('xxx')
  gameDeathState = false
  document.querySelector('.our-plane').src='./images/our-plane.gif'
  stageScene.classList.remove('death')

};


// 更改我放飞机节点对象视图
ourPlane.updataOurPlanePos = function () {
  this.node.style.left = this.x - 33 + "px";
  this.node.style.top = this.y - 40 + "px";
};
ourPlane.updataOurPlanePos();

// 触屏拖动 战斗机机跟随移动
gameScene.ontouchmove = function (event) {
  // console.log(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
  // var x = event.changedTouches[0].clientX;
  // var y = event.changedTouches[0].clientY;

  // 更改战斗机机对象
  ourPlane.x = event.changedTouches[0].clientX;
  ourPlane.y = event.changedTouches[0].clientY;
  // 更改战斗机机节点对象视图
  ourPlane.updataOurPlanePos();
};
// 鼠标移动
gameScene.onmousemove = function (event) {
  // console.log(event.clientX - stageScene.offsetLeft);

  // 更改战斗机机对象
  ourPlane.x = event.clientX - stageScene.offsetLeft;
  ourPlane.y = event.clientY - stageScene.offsetTop;
  // 更改战斗机机节点对象视图
  ourPlane.updataOurPlanePos();
};


// 检测碰撞
function checkCollision(obj1, obj2) {
  var h = Math.abs(obj1.x - obj2.x) <= (obj1.w + obj2.w) / 2
  var v = Math.abs(obj1.y - obj2.y) <= (obj1.h + obj2.h) / 2

  return h && v
}


//音频播放
function biu() {
  var x = document.createElement('audio')
  x.src = './images/发射子弹.mp3'
  x.play()
}

function ding() {
  var x = document.createElement('audio')
  x.src = './images/子弹铁皮.mp3'
  x.play()
}

//爆炸图片消失
var createboom=setInterval(function () {
  enemies.forEach(function (enemy, index, enemies) {
    if (enemy.death) {
      gameScene.removeChild(enemy.node);
      enemies.splice(index, 1);
    }
  })
}, 500);