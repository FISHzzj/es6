// pages/merchant/billingDetails/journal.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    createtime: '',
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    var that = this;
    this.setData({
      createtime: options.time,
    })
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.settlement.detail&createtime=1555102801", { createtime: options.time},function(res){
      console.log(res);
      if (res.info.length>0){
        for (var i = 0; i < res.info.length;i++){
          switch (res.info[i].type){
            case "1":
              res.info[i].type = "优惠买单";
              break
            case "2":
              res.info[i].type = "团购";
              break
            case "3":
              res.info[i].type = "点餐"
              break;
            default :
              res.info[i].type = "酒店预订"
              break;
          }
        }
      }
      that.setData({
        list: res.info,
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