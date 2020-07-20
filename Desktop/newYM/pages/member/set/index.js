// pages/member/set/index.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMerch: '',
    info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getInfo();
  },

  // 获取会员商家信息
  getInfo: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.info.upmerchpwd",{},function(res){
      console.log(res);
      if(res.error==0){
        that.setData({
          isMerch: res.ismerch,
          info: res.merch_account,
        })
      }
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