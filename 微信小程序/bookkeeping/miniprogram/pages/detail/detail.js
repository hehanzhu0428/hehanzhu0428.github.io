// miniprogram/pages/detail/detail.js
import {
  formats
} from '../../js/formats'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookingDateData: [],
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#318AF9',
    })
    //
    wx.setNavigationBarTitle({
      title: options.title + '记账详情'
    })
    this.getBookingDataById(options.id)
  },

  //根据id查询数据
  getBookingDataById(id) {
    //加载提示
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    wx.cloud.callFunction({
      //云函数名称
      name: 'getbookingDataByid',
      data: {
        id
      }

    }).then(result => {
      wx.hideLoading();
      
      result.result.data.map(v => {
        v.money = formats.thousandthPercentile(Number(v.money).toFixed(2));
      })

      this.setData({
        bookingDateData: result.result.data,
        loading:false
      })

    }).catch(err => {
      wx.hideLoading();
      
    })
  }

})