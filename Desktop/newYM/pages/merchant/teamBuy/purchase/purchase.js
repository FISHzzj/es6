// pages/purchase/purchase.js
var app = getApp(),a = app.requirejs("core")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin: "10:00",
    sTime: "10:00",
    end: "23:00",
    cantUse: '',
    cantTime: '',
    form: {
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cantUse: this.dateTransform(new Date()),
    })
  },

  // 时间戳转hh:mm
  timeTransform: function (unixtimestamp) {
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    return hour.substring(hour.length - 2, hour.length) + ":"
      + minute.substring(minute.length - 2, minute.length)
  },

  // 时间戳转YYYY-MM-DD
  dateTransform: function (unixtimestamp) {
    var unixtimestamp = new Date(Number(unixtimestamp) + (1000 * 60 * 60 * 24));
    var year = unixtimestamp.getFullYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
  },

  // 选择开始时间
  sTimeChange: function (e) {
    this.setData({
      sTime: e.detail.value,
      begin: e.detail.value,
    })
  },

  // 选择结束时间
  eTimeChange: function (e) {
    this.setData({
      end: e.detail.value,
    })
  },

  // 选择开始时间
  cantTimeChange: function (e) {
    this.setData({
      cantTime: e.detail.value,
    })
  },

  // 下一步
  formSubmit: function(e){
    var formData = e.detail.value;
    console.log(formData)
    if (formData.weektime_start == "" || formData.weektime_end == "" || formData.weektime_start < 1 || 1 > formData.weektime_end || 8 <= formData.weektime_end || 8 <= formData.weektime_start){
      a.alert("请正确填写周天，正确数值为1~7");
      return;
    }
    Object.assign(app.globalData.projectInfo, formData)
    wx.navigateTo({
      url: '/pages/merchant/teamBuy/content_ak/content_ak',
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