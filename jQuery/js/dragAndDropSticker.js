$(".i-list img").click(function () {
    // attr() 方法设置或返回被选元素的属性和值。
    // 当该方法用于返回属性值，则返回第一个匹配元素的值。
    // 当该方法用于设置属性值，则为匹配元素设置一个或多个属性/值对。
    console.log($(this).attr("src"))
    var sticker = ['<div class="i-move">',
        '<img src="' + $(this).attr("src") + '" alt="" class="ic">',
        '<img src="./images/close-icon2.png" alt="" class="fx">',
        "</div>"].join("");
    console.log(sticker)
    $(".i-img").append(sticker);//append()在目标里面插入新节点、新内容（生成在末尾）
});
// $(".fx").click(function () {
//     console.log(this)
//     //parent() 方法返回被选元素的直接父元素。 
//     $(".i-move").remove();

// });
// debugger
$(".i-img").on('click', '.fx', function () {

    // console.log(this)
    console.log("xxx")
    //parent() 方法返回被选元素的直接父元素。 
    $(this).parent().remove();
});
// $('.i-img').delegate('.fx','click',function(){
//     console.log("xxx")
//     //parent() 方法返回被选元素的直接父元素。 
//     $(this).parent().remove();
// })

$(".i-img").on('mousedown', '.i-move', function (event) {
    x1 = event.pageX - $(this).offset().left
    y1 = event.pageY - $(this).offset().top
    $('.i-move').find('img').eq(0).bind('mousemove', start);
    $('.i-move').find('img').eq(0).bind('mouseup', end);
    return false;
})

function start(event) {
    console.log(event.target)
    x2 = event.pageX - x1
    y2 = event.pageY - y1


    if (x2 >= 340) {
        x2 = 340
    }
    if (x2 <= 0) {
        x2 = 0
    }
    if (y2 >= 340) {
        y2 = 340
    }
    if (y2 <= 0) {
        y2 = 0
    }
    console.log(x2, y2)
    $(event.target).parent().css({
        'left': x2 + 'px',
        'top': y2 + 'px',
    })
    return false;
}

function end(event) {
    $(this).unbind('mousemove')
    $(this).unbind('mouseup')
}