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

  tab: function (e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: e.currentTarget.dataset.type,
    })
    this.getListData(type);
  },

  getListData: function (type) {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=msg.index", {}, function (res) {
      console.log(res)
      that.setData({
        list: res.ltmsgarr, //聊天信息
      })
      if(res.error == 0){
        if (type == 0){
          that.setData({
            list: res.ltmsgarr, //聊天信息
          })
        } else if (type == 1){
          that.setData({
            list: res.fkmsgarr, //反馈信息
          })
        } else if (type == 2){
          that.setData({
            list: res.tzmsgarr, //平台通知信息
          })
        }
      }
    })
  },
  tongzhi:function(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "/pages/xiaoxi/tongzhi/index?id="+id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  fangkui:function(e){
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: "/pages/xiaoxi/fangkui/index?id=" + id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
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