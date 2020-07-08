// var span0 = document.getElementsByTagName("span")[0];
// var span1 = document.getElementsByTagName("span")[1];
// var span2 = document.getElementsByTagName("span")[2];
// var span3 = document.getElementsByTagName("span")[3];
var endTime = new Date('2021/01/01 23:59:59').getTime() + 2000;
console.log(endTime);
// var interval = setInterval(function () {
//     var sumisec = endTime - Date.now(); //目标时间与当前时间剩余毫秒
//     //使2 ==> 02
//     function xx(n) {
//         if (n < 10) {
//             return "0" + n;
//         } else {
//             return String(n);
//         }
//     }
//     if (sumisec >= 0) {
//         span0.innerText = xx(Math.floor(sumisec / 1000 / 60 / 60 / 24));//剩余天数
//         span1.innerText = xx(Math.floor(sumisec / 1000 / 60 / 60 % 24));//剩余时
//         span2.innerText = xx(Math.floor(sumisec / 1000 / 60 % 60));//剩余分
//         span3.innerText = xx(Math.floor(sumisec / 1000 % 60));//剩余秒
//     } else {
//         clearInterval(interval);
//     }
// }, 0);


var interval = setInterval(function () {
    var sumisec = endTime - Date.now(); //目标时间与当前时间剩余毫秒
    function xx(n) {
        if (n < 10) {
            return "0" + n;
        } else {
            return String(n);
        }
    }
    if (sumisec >= 0) {
        $("span").eq(0).text(xx(Math.floor(sumisec / 1000 / 60 / 60 / 24)))
        $("span").eq(1).text(xx(Math.floor(sumisec / 1000 / 60 / 60 % 24)))
        $("span").eq(2).text(xx(Math.floor(sumisec / 1000 / 60 % 60)))
        $("span").eq(3).text(xx(Math.floor(sumisec / 1000 % 60)))

    } else {
        clearInterval(interval);
    }
}, 0);
