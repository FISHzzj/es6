// pages/location/location.js
var app = getApp(),
  a = app.requirejs("core"),
  cityList = require("../../utils/city.js").dataList;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: '',
    cityId: '',
    show: false,
    locCity: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      cityList: cityList,
      locCity: options.locCity
    })
  },

  toId: function(e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    that.setData({
      cityId: id,
      show: true,
    })
    setTimeout(() => {
      that.setData({
        show: false,
      })
    }, 550)
  },

  choose: function(e) {
    var cityName = e.currentTarget.dataset.cityname;
    this.setData({
      locCity: cityName
    })
    app.globalData.locCity = cityName;
    let page = getCurrentPages();
    let lastPage = page[page.length - 2];
    lastPage.setData({
      locCity: cityName,
      back: true
    })
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})