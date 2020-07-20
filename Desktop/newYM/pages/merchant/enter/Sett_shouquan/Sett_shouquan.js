// pages/Sett_shouquan/Sett_shouquan.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  submit: function (e) {
    if (e.detail.value.code==""){
      wx.showModal({
        title: '提示',
        content: '授权码不能为空',
      })
      return
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.authorizationcode",{
      code: e.detail.value.code,
    },function(res){
      console.log(res)
      if (res.status == "1") {
        wx.navigateTo({
          url: "/pages/merchant/enter/Settledin_xq/Settledin_xq",
        })
        
      } else {
        a.toast(res.message,"none")
        return
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})