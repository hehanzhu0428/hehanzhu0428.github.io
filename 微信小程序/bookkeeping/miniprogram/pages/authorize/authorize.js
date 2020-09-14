// miniprogram/pages/authorize/authorize.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
      title: '授权认证',
    })
  },
  getUserInfo(e) {
    //
    if (e.detail.userInfo) {
      app.globalData.isAuthorize = true
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})