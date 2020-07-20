// pages/merchant/merchantInfo/merchantInfo.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '', //判断进入方式1为入驻，0为修改
    index: 0,
    region: ['请选择地址'],
    mode: "scaleToFill",
    banner: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    cList: [],
    parentList: [],
    childList: [],
    parentIndex: 0,
    childIndx: 0,
    location: {
      lat: 23.16,
      lng: 113.23
    },
    address: '',
    category: [0, 0],
    town: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      type: options.type,
    })
    if (options.type == 2) {
      this.getshopInfo();
    }
    this.getcategory();
  },

  // 获取轮播图
  getBannerList: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.storebanner", {}, function(res) {
      for (var i = 1; i < 10; i++) {
        var key = "store_img" + i;
        if (res[key] != "") {
          that.data.banner.push(res[key]);
        }
      }
      that.setData({
        banner: that.data.banner,
      })
    })
  },

  // 获取门店信息
  getshopInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.storeinfo", {}, function(res) {
      console.log(res);
      if (res.error == 0) {
        that.setData({
          memberInfo: res.member,
          category: res.category == "" ? [0, 0] : res.category.split("-"),
          town: res.area == "" ? "" : res.area.split("-")[res.area.length - 1],
        })
      } else {
        a.alert("获取门店信息失败")
      }
    })
  },

  // 获取分类信息
  getcategory: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.getcategory", {}, function(res) {
      console.log(res)
      var id = res.parentType[0].id;
      var childList = []
      for (var i = 0; i < res.childType.length; i++) {
        if (res.childType[i].parentId == id) {
          childList.push(res.childType[i])
        }
      }
      var cList = [];
      cList.push(res.parentType);
      cList.push(childList);
      that.setData({
        cList: cList,
        childList: res.childType,
        parentList: res.parentType,
      })
      // console.log(that.data.cList);
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
    this.getBannerList()
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