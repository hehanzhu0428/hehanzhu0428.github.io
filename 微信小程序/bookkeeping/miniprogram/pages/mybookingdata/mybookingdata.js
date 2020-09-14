// miniprogram/pages/mybookingdata/mybookingdata.js
import {
  formats
} from '../../js/formats'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookingDateData: [],
    skip: 0,
    limit: 15,
    isHasData: true,
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
    wx.setNavigationBarTitle({
      title: '我的记账',
    })
    this.getBookingDateData()
  },
  //获取记账数据
  getBookingDateData() {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getbookingDataByLimit',
      data: {
        skip: this.data.skip,
        limit: this.data.limit
      }
    }).then(result => {
      wx.hideLoading()
      //
      result.result.data.map(v => {
        v.money = formats.thousandthPercentile(Number(v.money).toFixed(2))
        this.data.bookingDateData.push(v)
      })
      //
      this.setData({
        skip: this.data.skip + this.data.limit,
        bookingDateData: this.data.bookingDateData,
        loading:false
      })
      if (result.result.data.length < 15) {
        this.setData({
          isHasData: false
        })
      }
    }).catch(err => {
      wx.hideLoading()
      
    })
  },
  //删除记账数据
  delBookingDataById(e) {
    wx.showModal({
      title: '删除此条记录',
      content: '是否删除',
      success:res=> {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'delbookingDataByid',
            data: {
              _id: e.currentTarget.dataset.id,
            }
          }).then(result => {
            wx.hideLoading()
            
            if (result.result.stats.removed == 1) {
              this.data.bookingDateData.splice(e.currentTarget.dataset.index, 1)
              this.setData({
                bookingDateData: this.data.bookingDateData
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 1000
              })
            }
          }).catch(err => {
            wx.hideLoading()
            
          })
        } else if (res.cancel) {}
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isHasData) {
      return
    }
    this.getBookingDateData()
  },
})