// miniprogram/pages/my/my.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cellData: [{
      title: '我的记账',
      pageUrl: '../mybooking/mybooking'
    }, ],
    isAuthorize: false,
    userInfo: {},
    loading:true
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#318AF9',
    })
    wx.setNavigationBarTitle({
      title: '我的',
    })
    this.checkAuthorize()
  },
  //检测授权
  checkAuthorize() {
    this.setData({
      isAuthorize: app.globalData.isAuthorize,
      loading:false
    })
    if (this.data.isAuthorize) {
      wx.getUserInfo({
        success: res => {
          //
          this.setData({
            userInfo: {
              avatarUrl: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName
            },
           
          })
        }
      })
    }
  },
  goPage(e) {
    //
    wx.navigateTo({
      url: e.currentTarget.dataset.pageurl,
    })
  }
})