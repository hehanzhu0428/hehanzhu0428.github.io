var level = 3;
var originalW = 300;
var originalH = 300;

var zoomW = 300;
var zoomH = 300;

var maskW = originalW / level;
var maskH = originalH / level;

var stage = document.getElementsByClassName("stage")[0];
var original = stage.getElementsByClassName("original")[0];
var mask = original.getElementsByClassName("mask")[0];
var zoom = stage.getElementsByClassName("zoom")[0];
var imgs = original.getElementsByTagName("img");
var lis = document.getElementsByTagName("li");
var btns = document.getElementsByTagName("button");
var imgarr = ["./images/0001.png", "./images/0002.png", "./images/gx.jpeg"]
var current = 0;
function showCurrent() {
    for (var i = 0; i < lis.length; i++) {
        if (i == current) {
            imgs[i].style.display = "block";
            zoom.style.backgroundImage = "url(" + imgarr[i] + ")";
        } else {
            imgs[i].style.display = "none";
        }
    }
}
showCurrent();
for (i = 0; i < lis.length; i++) {
    lis[i].aaa = i;
    lis[i].onmousemove = function () {
        current = this.aaa;
        showCurrent();
    }
}
// 点击按钮改变放大倍数
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
        console.log(this.innerText);
        level = Number(this.innerText);
        console.log(level);

        maskW = originalW / level;
        maskH = originalH / level;

        mask.style.width = maskW + "px";
        mask.style.height = maskH + "px";

        zoom.style.backgroundSize = level + "00% auto";
    };
}
original.onmousemove = function (event) {
    var x = event.pageX - 8;//body自带8外边距
    var y = event.pageY - 8;
    // console.log(x, y);

    if (x <= maskW / 2) {//maskW/2是mask的中心点
        x = maskW / 2;
    }
    if (x >= originalW - maskW / 2) {
        x = originalW - maskW / 2;
    }
    if (y <= maskH / 2) {//控制范围 不让mask超出盒子范围
        y = maskH / 2;
    }
    if (y >= originalH - maskH / 2) {
        y = originalH - maskH / 2;
    }

    mask.style.top = y - maskH / 2 + "px";//-50是因为鼠标在mask的中心点
    mask.style.left = x - maskW / 2 + "px";
    // 300是zoom的宽高 100是mask的宽高
    zoom.style.backgroundPositionX = -(x - maskW / 2) * (zoomW / maskW) + "px";
    zoom.style.backgroundPositionY = -(y - maskH / 2) * (zoomH / maskH) + "px";
};
original.onmouseover = function () {
    mask.style.display = 'block';
    zoom.style.display = 'block';
}
original.onmouseout = function () {
    mask.style.display = 'none';
    zoom.style.display = 'none';
}