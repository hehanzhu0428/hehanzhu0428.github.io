//无缝轮播图
$('.wrapp1 .demo').attr('title', function (index) {
    return index
})

function filterByIndex(n) {
    return $('.wrapp1 .demo').filter(function (index) {
        return $(this).attr('title') == n
    })
}

function nextpic() {
    // console.log("xxx")
    $(".wrapp1").animate({
        left: '-640px'
    }, 300, function () {
        $('.wrapp1').children().first().appendTo($('.wrapp1'))

        $('.wrapp1').css({
            left: 0
        })

    });
}

function prevpic() {
    $(".wrapp1").css({ left: '-640px' }).animate({
        left: 0
    });
}

//点击小点点
$(".active li").click(function () {
    var currentIndex = $('.wrapp1').children().first().attr('title')
    var prepareIndex = $(this).index()
    // console.log($(this).index())
    $(this).addClass('con').siblings().removeClass('con')
    if (currentIndex < prepareIndex) {
        $('.wrapp1').children().first().after(filterByIndex(prepareIndex))
        nextpic()
    } else {
        $('.wrapp1').children().first().before(filterByIndex(prepareIndex))
        prevpic()
    }
});
function showCurrent(index) {
    $('.active li').eq(index).addClass('con').siblings().removeClass('con')
}

//下一张点击
$(".next").click(function () {
    var currentIndex = $('.wrapp1').children().first().attr('title')
    var prepareIndex = ++currentIndex > $('.wrapp1 .demo').length - 1 ? 0 : currentIndex
    // console.log(currentIndex, prepareIndex)

    $('.wrapp1').children().first().after(filterByIndex(prepareIndex))
    showCurrent(prepareIndex)
    // 从右到左 滚动
    nextpic()
});

//上一张点击
$(".prev").click(function () {
    var currentIndex = $('.wrapp1').children().first().attr('title')
    var prepareIndex = --currentIndex < 0 ? $('.wrapp1 .demo').length - 1 : currentIndex
    $('.wrapp1').children().first().before(filterByIndex(prepareIndex))
    showCurrent(prepareIndex)
    // 从右到左 滚动
    prevpic()
});
// 自动播放
var autoplayId = setInterval(function () {
    var currentIndex = $('.wrapp1').children().first().attr('title')
    var prepareIndex = ++currentIndex > $('.wrapp1 .demo').length - 1 ? 0 : currentIndex
    showCurrent(prepareIndex)
    nextpic()
}, 5000)
//无缝轮播图end

//单复选框
var allchecked = false;
$('form label').click(function () {
    // console.log("aaa")
    if ($(this).find('span').text() == '全选') {
        allchecked = !allchecked
        $('form label').find('input').prop('checked', allchecked)
    }
    $('form label').each(function (index, element) {
        // element == this
        var ischecked = $(element).find('input').prop('checked')
        if (ischecked === true) {
            $(element).addClass('checked')
        } else {
            $(element).removeClass('checked')
        }
    });
});

//折叠面板
$('.collapse-part-title').click(function () {
    console.log("aaa")
    if ($(this).find('i').hasClass('collapse-part-arrow-anti')) {
        $(this).find('i').removeClass('collapse-part-arrow-anti')
    } else {
        $(this).find('i').addClass('collapse-part-arrow-anti')
    }
    if ($(this).next().hasClass('collapse-part-content-show')) {
        $(this).next().removeClass('collapse-part-content-show')
    } else {
        $(this).next().addClass('collapse-part-content-show')
    }


});

//对话框
$('.btnn').find('button').click(function () {
    console.log("xxx")
    var sticker = ['<div class="dialog-container">',
        '<div class="dialog-mask">', '</div>',
        '<div class="dialog-wrapper">',
        '<div class="dialog-main">',
        '<div>',
        '<div class="dialog-shortcuts">',
        '<i>',
        '<svg viewBox="0 0 1024 1024" version="1.1" width="30" height="30">',
        '<path ' + $(this).find('i').text() + '>',
        '</path>',
        '</svg>',
        '</i>',
        '<div>',
        '<p>', $(this).find('em').text(), '</p>',
        '<div>', '内容区域', '</div>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="dialog-footer noselect" style="border-top: none;">',
        '<div class="dialog-ok">', '<span>', '确定', '</span>', '</div>',
        '</div>',
        '</div>',
        '</div>'].join("");
    console.log(sticker)
    $(".dialogBox").append(sticker);
});
$('.dialogBox').on('click', 'span', function () {
    $('.dialog-container').fadeOut(500);
});

//数字输入框
// var canClick = true;
$('.inputnumber-increase').click(function () {
    // console.log("xxx");
    var count = $('.inputnumber-container').find('input').val()
    count++;
    $('.inputnumber-container').find('input').prop('value', count)
});
$('.inputnumber-decrease').click(function () {
    // console.log("xxx");
    var count = $('.inputnumber-container').find('input').val()
    count--;
    $('.inputnumber-container').find('input').prop('value', count)

});
$('.inputnumber-container').hover(function () {
    // over
    $(this).addClass('inputnumber-container-active')
}, function () {
    // out
    $(this).removeClass('inputnumber-container-active')
}
);

//加载中
var loading = setInterval(function () {
    //transform: rotate(0deg);
    $('.loading-ring').css({
        transform: 'rotate(' + 180 + 'deg)'
    })
}, 100)

//下拉框
$('.select-input').find('i').click(function () {
    $('.select-wrapper').show()
    $('.select-input').addClass('select-input-active')
});
$('.select-wrapper ul li').hover(function () {
    // over
    $(this).addClass('active')
}, function () {
    // out
    $(this).removeClass('active')
}
);
$('.select-wrapper ul li').click(function () {
    // $(this).find('span').text()
    $('.select-input').find('input').prop('value', $(this).find('span').text())
    $('.select-wrapper').hide()
    $(this).addClass('select-selected').siblings().removeClass('select-selected')

});

//标签页
var currentLabel = 0
function showCurrentLabel(index) {
    $(".tabs-content div").eq(index).addClass("active").siblings().removeClass("active")
}
$(".tabs-header div").click(function () {
    $(this).addClass("tabs-active").siblings().removeClass("tabs-active")
    currentLabel = $(this).index()
    showCurrentLabel(currentLabel)
});

//表格
$(".table-tbody tr").hover(function () {
    // over
    $(this).css('backgroundColor', '#E8F8FE');
}, function () {
    // out
    $(this).css('backgroundColor', '#fff');
}
);
$('.table-arrow i.table-sort-up').hover(function () {
    // over
    $(this).css('border-bottom-color', '#19B6F8');
}, function () {
    // out
    $(this).css('border-bottom-color', '#aaa');
}
);
$('.table-arrow i.table-sort-down').hover(function () {
    // over
    $(this).css('border-top-color', '#19B6F8');
}, function () {
    // out
    $(this).css('border-top-color', '#aaa');
}
);
$(".table-arrow i.table-sort-up").click(function () {
    $(".table-tbody tr")

});