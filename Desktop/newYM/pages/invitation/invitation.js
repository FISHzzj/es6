// pages/invitation/invitation.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    list: [{}],
    unused: 0,
    used: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
  },

  tab: function(e){
    this.setData({
      type: e.currentTarget.dataset.type,
    })
    this.getListData();
  },

  getListData: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.invitecode",{type: this.data.type},function(res){
      console.log(res)
      that.setData({
        list: res.data,
        unused: res.count0,
        used: res.count1
      })
    })
  },

  copy:function(e){
    var code = e.currentTarget.dataset.code;
    wx.setClipboardData({
      data: code,
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