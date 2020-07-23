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
    if ($(this).find('span').text() === '全选') {
        allchecked = !allchecked
        $('.checkbox label').find('input').prop('checked', allchecked)
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
// var currentLabel = 0
// function showCurrentLabel(index) {
//     $(".tabs-content div").eq(index).addClass("active").siblings().removeClass("active")
// }
// $(".tabs-header div").click(function () {
//     $(this).addClass("tabs-active").siblings().removeClass("tabs-active")
//     currentLabel = $(this).index()
//     showCurrentLabel(currentLabel)
// });
var that;
class Tab {
    constructor(id) {
        //获取DOM元素 页面固定的 不是动态添加的
        that = this;//保存this指向，方便后面调用
        this.main = document.querySelector(id);
        this.li = document.querySelector('.tabs-card');

        this.con = document.querySelector('.tabs-content');

        this.add = this.li.querySelector('.addTab')
        this.init()
    }
    init() {
        //初始化事件
        this.updateNode();
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.reTab[i].onclick = this.removeTab;
            this.spans1[i].ondblclick = this.editTab;
            this.spans2[i].ondblclick = this.editTab;
        }
        this.add.onclick = this.addTab;
    }
    updateNode() {//更新节点，防止我们用js添加的节点没有获取到，绑定不了事件，会出现错误
        this.lis = this.li.querySelectorAll('div');
        this.cons = this.con.querySelectorAll('div');
        this.reTab = this.li.querySelectorAll('.fa-times-circle-o')
        this.spans1 = this.li.querySelectorAll('span')
        this.spans2 = this.con.querySelectorAll('span')

    }
    //切换功能
    toggleTab() {
        //console.log(this.index)
        that.clearClass();
        this.className = 'tabs-active';
        that.cons[this.index].className = 'active'
    }
    //添加功能
    addTab() {
        //   console.log('xxx')
        that.clearClass();
        let linode = ' <div class="tabs-active"><span>新标签</span><i class="fa fa-times-circle-o" aria-hidden="true"></i></div>'

        let connode = ' <div class="active"><span>新内容</span></div>'

        that.li.insertAdjacentHTML('beforeend', linode)//追加到最后
        that.con.insertAdjacentHTML('beforeend', connode)//追加到最后
        that.init();//因为初始化 调用了更新节点 
    }
    //删除功能
    removeTab(e) {
        //阻止冒泡 防止触发切换效果
        e.stopPropagation();
        //获取父级index
        var index = this.parentNode.index;//获取父级下标
        console.log(index)

        that.lis[index].remove();
        that.cons[index].remove();
        that.init();
        if (document.querySelector('.tabs-active')) {
            return;
        }
        index--;
        that.lis[index] && that.lis[index].click();//判断

    }
    //修改功能
    /* 
    2.双击事件是: ondblclick
    3.如果双击文字会默认选定文字此时需要双击禁止选中文字
    4.window.getSelection ? window.getSelection().removeAllRanges():document.selection.empty();

     */
    editTab() {
        //获取原本的文字
        var str = this.innerHTML;
        //console.log(str)
        //console.log('xxx')
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text"/>'
        var input = this.children[0]
        //console.log(input)
        input.value = str;
        input.select();//双击后选定文字
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;//失去焦点后，text的值赋给span
        }

        input.onkeyup = function (e) {
            if (e.keyCode === 13) {//回车键完成修改
                this.blur();//手动调用失去焦点事件,不要加on
            }
        }

    }
    //清除class
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {

            this.lis[i].className = '';
            this.cons[i].className = '';
        }
    }s
}
new Tab('#tab');
//var tab = new Tab()

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