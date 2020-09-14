// miniprogram/pages/chart/chart.js
import {
  formats
} from '../../js/formats'
let wxCharts = require('../../js/wxcharts')
let pieChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateRange: {
      start: '',
      end: ''
    },
    date: '',
    dateText: '',
    switchymd: ['年', '月', '日'],
    currentymd: 1,
    text: '月',
    //有30天月份
    day30Data: ['04', '06', '09', '11'],
    totalTitle: [{
      title: '收入',
      type: 'shouru',
      total: 0,
      isActive: true,
    }, {
      title: '支出',
      type: 'zhichu',
      total: 0,
      isActive: false,
    }],
    booking: {
      shouru: {},
      zhichu: {}
    },
    //展示收入/支出的数据
    bookingData: [],
    loading:true
  },
  onLoad: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#318AF9',
    })
    wx.setNavigationBarTitle({
      title: '图表',
    })
  },
  onShow: function () {
    this.getProDate()
  },
  //获取项目上线时间
  getProDate() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "getproDate", //云函数名称
      // data: { //参数

      // }
    }).then(result => {
      wx.hideLoading()
      //
      this.data.dateRange.start = result.result.data[0].date
      //获取当前时间
      let end = formats.formatDate(new Date(), 'yyyy-MM-dd')
      this.data.dateRange.end = end
      //响应页面数据
      this.setData({
        dateRange: this.data.dateRange,
        date: end,
        loading:false
      })
      this.getDataByYMD()
      this.showFormatYMD(end)
    }).catch(err => {
      wx.hideLoading()
      
    })
  },
  //切换年月日
  switchYMD() {
    if (this.data.currentymd == this.data.switchymd.length - 1) {
      this.data.currentymd = 0
    } else {
      this.data.currentymd++
    }
    this.setData({
      currentymd: this.data.currentymd,
      text: this.data.switchymd[this.data.currentymd]
    })
    this.getDataByYMD()
  },
  //切换收入/支出标题
  switchSZ(e) {
    
    if (e.currentTarget.dataset.active) {
      return
    }
    for (let i = 0; i < this.data.totalTitle.length; i++) {

      
      if (this.data.totalTitle[i].isActive) {
        this.data.totalTitle[i].isActive = false
        break
      }
    }
    this.data.totalTitle[e.currentTarget.dataset.index].isActive = true

    this.setData({
      totalTitle: this.data.totalTitle
    })
    this.getDataBySZ()
  },
  //选择日期()
  selectDate(e) {
    //
    this.setData({
      date: e.detail.value
    })
    this.getDataByYMD()
    this.showFormatYMD(e.detail.value)
  },
  //根据按年月日查询处理显示的日期格式
  showFormatYMD(ymd) {
    if (this.data.currentymd == 0) {
      this.data.dateText = ymd.slice(0, 4)
    } else if (this.data.currentymd == 1) {
      this.data.dateText = ymd.slice(0, 7)
    } else {
      this.data.dateText = ymd
    }
    this.setData({
      dateText: this.data.dateText
    })
  },
  //根据年月日查询数据
  getDataByYMD() {
    let date = {

    }
    let currentYMD = this.data.dateRange.end.split('-')
    
    let selectYMD = this.data.date.split('-')
    //按年查询
    if (this.data.currentymd == 0) {
      date.start = `${selectYMD[0]}-01-01`
      //判断是否同年
      if (selectYMD[0] == currentYMD[0]) {
        date.end = this.data.dateRange.end
      } else {
        date.end = `${selectYMD[0]}-12-31`
      }
    } else if (this.data.currentymd == 1) { //按月查询
      date.start = `${selectYMD[0]}-${selectYMD[1]}-01`
      //如果同年
      if (selectYMD[0] == currentYMD[0]) {
        //如果同月
        if (selectYMD[1] == currentYMD[1]) {
          date.end = this.data.dateRange.end
        } else {
          //如果不同月，判断是不是二月份，平年还是闰年
          if (selectYMD[1] == '02') {
            if (selectYMD[0] % 400 == 0 || (selectYMD[0] % 4 == 0 && selectYMD[0] % 100 != 0)) {
              //闰年
              date.end = `${selectYMD[0]}-${selectYMD[1]}-29`
            } else {
              //平年
              date.end = `${selectYMD[0]}-${selectYMD[1]}-28`
            }
          } else {
            //如果不是2月份，判断30还是31天，4,6,9,11==>30
            if (this.data.day30Data.indexOf(selectYMD[1]) > -1) {
              date.end = `${selectYMD[0]}-${selectYMD[1]}-30`
            } else {
              date.end = `${selectYMD[0]}-${selectYMD[1]}-31`
            }
          }
        }
      } else {
        //如果不同年,月份只有末尾，不存在当前日期，如18,19号等
        //判断2月份
        if (selectYMD[1] == '02') {
          if (selectYMD[0] % 400 == 0 || (selectYMD[0] % 4 == 0 && selectYMD[0] % 100 != 0)) {
            //闰年
            date.end = `${selectYMD[0]}-${selectYMD[1]}-29`
          } else {
            //平年
            date.end = `${selectYMD[0]}-${selectYMD[1]}-28`
          }
        } else {
          //如果不是2月份，判断30还是31天，4,6,9,11==>30
          if (this.data.day30Data.indexOf(selectYMD[1]) > -1) {
            date.end = `${selectYMD[0]}-${selectYMD[1]}-30`
          } else {
            date.end = `${selectYMD[0]}-${selectYMD[1]}-31`
          }
        }
      }
    } else { //按日查询
      date.start = this.data.date
    }
    this.showFormatYMD(date.start)
    //调用云函数
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "getdatabyTime", //云函数名称
      data: date
    }).then(result => {
      wx.hideLoading()
      
      //初始化数据，不然会累加
      for (let i = 0; i < this.data.totalTitle.length; i++) {
        this.data.totalTitle[i].total = 0
      }
      this.data.booking = {
        shouru: {},
        zhichu: {}
      }
      //如果查询到的数据为空
      if (result.result.data.length == 0) {
        this.setData({
          totalTitle: this.data.totalTitle,
          booking: this.data.booking,
          bookingData: []
        })
        return
      }

      //按照收入支出分类统计
      result.result.data.map(v => {
        //总计
        if (!this.data.booking[v.bookingTypeData.type].total) {
          this.data.booking[v.bookingTypeData.type].total = Number(v.money)
        } else {
          this.data.booking[v.bookingTypeData.type].total += Number(v.money)
        }

        //按照餐饮，购物，出行...分类
        if (!this.data.booking[v.bookingTypeData.type][v.bookingTypeListData.type]) {
          //如果不存在，初始化一个数组，得到符合的数据格式

          //随机生成颜色
          let r = Math.ceil(Math.random() * 255)
          let g = Math.ceil(Math.random() * 255)
          let b = Math.ceil(Math.random() * 255)

          this.data.booking[v.bookingTypeData.type][v.bookingTypeListData.type] = {
            total: Number(v.money),
            icon: v.bookingTypeListData.icon,
            title: v.bookingTypeListData.title,
            type: v.bookingTypeData.type,
            color: `rgb(${r},${g},${b})`,
            num: 1,
            _ids: v._id,
            typeData: [v],

            //饼图的数据
            name: v.bookingTypeListData.title,
            data: Number(v.money),
            format: value => {
              return `${v.bookingTypeListData.title} ${(value*100).toFixed(3)}%`
            }
          }
        } else {
          this.data.booking[v.bookingTypeData.type][v.bookingTypeListData.type].total += Number(v.money)

          this.data.booking[v.bookingTypeData.type][v.bookingTypeListData.type].data += Number(v.money)

          this.data.booking[v.bookingTypeData.type][v.bookingTypeListData.type].num++

          this.data.booking[v.bookingTypeData.type][v.bookingTypeListData.type].typeData.push(v)

          this.data.booking[v.bookingTypeData.type][v.bookingTypeListData.type]._ids += '-' + v._id
        }
        //
      })

      //计算餐馆，购物....所占的百分比
      for (let key in this.data.booking) {
        //
        //总收入，总支出
        let total = this.data.booking[key].total || 0
        for (let i = 0; i < this.data.totalTitle.length; i++) {
          if (key == this.data.totalTitle[i].type) {
            this.data.totalTitle[i].total = formats.thousandthPercentile(total.toFixed(2))
            break
          }
        }
        //遍历shoru/zhichu里的每一项
        for (let k in this.data.booking[key]) {
          if (k == 'total') {
            continue
          }
          //
          this.data.booking[key][k].percentage = this.data.booking[key][k].total / this.data.booking[key].total
          this.data.booking[key][k].total = formats.thousandthPercentile(this.data.booking[key][k].total.toFixed(2))
        }
        //
      }
      //
      //响应页面数据
      this.setData({
        totalTitle: this.data.totalTitle,
        booking: this.data.booking
      })
      this.getDataBySZ()
    }).catch(err => {
      wx.hideLoading()
      
    })
  },
  //根据切换收入支出获得相应数据
  getDataBySZ() {
    this.data.bookingData = []
    for (let i = 0; i < this.data.totalTitle.length; i++) {
      if (this.data.totalTitle[i].isActive) {
        let currentBookingData = this.data.booking[this.data.totalTitle[i].type]
        //
        for (let key in currentBookingData) {

          if (key == 'total') {
            continue
          }
          this.data.bookingData.push(currentBookingData[key])
        }
        break
      }
    }
    
    this.setData({
      bookingData: this.data.bookingData
    })
    this.drawPieChart(this.data.bookingData)
  },

  //根据数据绘制出饼图
  drawPieChart(PieData) {
    if (PieData.length == 0) {
      return
    }

    //获取屏幕宽度
    //获取屏幕宽度
    let screenWidth = wx.getSystemInfoSync().screenWidth;
    pieChart = new wxCharts({
      animation: true,
      canvasId: 'pieCanvas',
      type: 'pie',
      series: PieData,
      width: screenWidth,
      height: 300,
      dataLabel: true,
    })
  },

  //去到详情界面
  goDetail(e) {
    //参数序列化
    let params = '';
    for (let key in e.currentTarget.dataset) {
      params += key + '=' + e.currentTarget.dataset[key] + '&'
    }
    params = params.slice(0, -1);
    wx.navigateTo({
      url: '../detail/detail?' + params
    })
  }
})