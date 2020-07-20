// pages/my/redPacket/redPacket.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    balance: "0.00",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
    this.getBalance();
  },

  // 获取红包余额
  getBalance: function () {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.log", {}, function (res) {
      console.log(res)
      that.setData({
        balance: res.credit2
      })
    })
  },

  // 获取明细列表
  getDataList: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.log.get_list",{},function(res){
      console.log(res)
      that.setData({
        dataList: res.list,
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