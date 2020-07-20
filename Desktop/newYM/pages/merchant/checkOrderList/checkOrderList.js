// pages/merchant/checkOrderList/checkOrderList.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getList()
  },

  // 获取核销记录
  getList: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.member.verification.getlog",{page: that.data.page},function(res){
      console.log(res);
      if (res.error == 0){
        if (res.list.length == 0) {
          a.alert("没有更多数据了");
          return
        }
        that.setData({
          list: that.data.list.concat(res.list),
        })
      }else{
        a.toast("数据错误","none")
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
    this.setData({
      page: this.data.page+=1,
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})