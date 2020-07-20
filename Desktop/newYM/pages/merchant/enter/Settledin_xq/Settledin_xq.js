// pages/Settledin_xq/Settledin_xq.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhuti: {},
    mendian: {},
    zhengzhao:{},
    xiangmu: {},
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getMerchantInfo();
  },

  // 获取商家入驻信息
  getMerchantInfo: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo",{},function(res){
      console.log(res);
      that.setData({
        zhuti: res.main_info,
        mendian: res.store_info,
        zhengzhao: res.certificate_info,
        xiangmu: res.youhuisetting, 
      })
    })
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