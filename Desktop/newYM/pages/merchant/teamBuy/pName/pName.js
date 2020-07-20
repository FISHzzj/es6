// pages/merchant/teamBuy/pName/pName.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    wx.hideShareMenu()
    app.globalData.projectInfo = {}
  },

  inpChange: function(e){
    var value = e.detail.value;
    this.setData({
      value: value,
    })
  },
  
  // 下一步
  next: function(){
    if(this.data.value==""){
      a.alert("请填写正确的项目名称")
    }else{
      app.globalData.projectInfo.title = this.data.value;
      wx.navigateTo({
        url: '/pages/merchant/teamBuy/attribute/attribute',
      })
    }
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