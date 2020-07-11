var current = 0;
var left = 0;
var canClick = true;
function showCurrent(index) {
    $(".slide_content ul").eq(index).fadeIn(800).siblings().hide()
    $(".slide_wrap ul li").eq(index).addClass("on").siblings().removeClass("on")
}

function dh() {
    $(".slide_wrap ul").animate({
        "left": "-" + left + "px"
    }, 800, function () {
        canClick = true;
    })
}


$(".next").click(function () {
    // console.log("xxx")
    // debugger
    if (canClick) {
        canClick = false;
        current++
        if (current >= $(".slide_wrap ul li").length - 1) {
            current = $(".slide_wrap ul li").length - 1;
        }
        // left = $(".slide_wrap ul li").width() + left;
        left = $(".slide_wrap ul li").width() * current;
        dh()

    }
    showCurrent(current);
})
$(".prev").click(function () {
    // debugger
    if (canClick) {
        canClick = false;
        current--
        if (current < 0) {
            current = 0;
        }
        // console.log(current);
        // left = left-$(".slide_wrap ul li").width();
        left = $(".slide_wrap ul li").width() * current;

        dh()
    }
    showCurrent(current);
})
$(".slide_wrap li").click(function () {
    $(this).addClass('on').siblings().removeClass('on')
    console.log($(this).index())
    $(".slide_content ul").eq($(this).index()).fadeIn(800).siblings().hide()
});