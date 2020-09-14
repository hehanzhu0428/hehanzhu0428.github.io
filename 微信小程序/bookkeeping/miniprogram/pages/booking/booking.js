// miniprogram/pages/booking/booking.js
import {formats} from '../../js/formats'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    typeData: [{
        title: '收入',
        type: 'shouru',
        isActive: true
      },
      {
        title: '支出',
        type: 'zhichu',
        isActive: false
      }
    ],
    typeListData: [],
    accountData: [{
        title: '现金',
        type: 'cash',
        isActive: true
      },
      {
        title: '支付宝',
        type: 'alipay',
        isActive: false
      },
      {
        title: '微信',
        type: 'wechat',
        isActive: false
      },
      {
        title: '信用卡',
        type: 'creditcard',
        isActive: false
      },
      {
        title: '储蓄卡',
        type: 'depositcard',
        isActive: false
      }
    ],
    date: "请选择日期",
    money: 0,
    content: '',
    dateRange:{
      start:'',
      end:''
    },
    loading:true

  },
  onLoad() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#318AF9',
    })
    this.getTypeList()
    this.getProDate()
  },
  //切换标签
  toggleTag(e) {
    //

    if (e.currentTarget.dataset.active) {
      
      return;
    }
    let data = e.currentTarget.dataset.whatdata
    for (let i = 0; i < this.data[data].length; i++) {
      if (this.data[data][i].isActive) {
        this.data[data][i].isActive = false;
        break;
      }
    }

    this.data[data][e.currentTarget.dataset.index].isActive = true;

    //响应页面数据
    this.setData({
      [data]: this.data[data]
    })
  },
  getTypeList() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "geticonData", //云函数名称
      // data: { //参数

      // }
    }).then(result => {
      wx.hideLoading()
      //
      this.data.typeListData = result.result.data
      //响应页面数据
      this.setData({
        typeListData: this.data.typeListData
      })
    }).catch(err => {
      wx.hideLoading()
      
    })
  },
  //获取数据
  getInputData(e) {
    //
    let data = e.currentTarget.dataset.name
    // 
    // 
    this.data[data] = e.detail.value
    this.setData({
      [data]: this.data[data]
    })
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
      let end=formats.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss')
      this.data.dateRange.end=end
      //响应页面数据
      this.setData({
        dateRange: this.data.dateRange,
        loading:false
      })
    }).catch(err => {
      wx.hideLoading()
      
    })
  },
  save() {
    let bookingData = {}
    for (let i = 0; i < this.data.typeData.length; i++) {
      if (this.data.typeData[i].isActive) {
        bookingData.bookingTypeData = {
          title: this.data.typeData[i].title,
          type: this.data.typeData[i].type
        }
      }

    }
    let isSelect = false
    for (let i = 0; i < this.data.typeListData.length; i++) {
      if (this.data.typeListData[i].isActive) {
        bookingData.bookingTypeListData = {
          title: this.data.typeListData[i].title,
          type: this.data.typeListData[i].type,
          icon: this.data.typeListData[i].icon
        }
        isSelect = true
        break
      }
    }

    if (!isSelect) {
      return wx.showToast({
        title: '请选择收入/支出的方式',
        icon: 'none',
        mask: true
      })
    }
    for (let i = 0; i < this.data.accountData.length; i++) {
      if (this.data.accountData[i].isActive) {
        bookingData.accountSelData = this.data.accountData[i].title
        break
      }
    }
    if (this.data.date == "请选择日期") {
      return wx.showToast({
        title: '请选择日期',
        icon: 'none',
        mask: true
      })
    }
    if (this.data.money == 0 || this.data.money == '') {
      return wx.showToast({
        title: '请输入金额',
        icon: 'none',
        mask: true
      })
    }
    bookingData.date = this.data.date
    bookingData.money = parseFloat(this.data.money)
    bookingData.content = this.data.content
    //

    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: "addbookingData", //云函数名称
      data: bookingData //参数
    }).then(result => {
      wx.hideLoading()

    }).catch(err => {
      wx.hideLoading()
      
    })
  }
})