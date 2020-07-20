// pages/homePage/homePage.js
var app = getApp(),
  a = app.requirejs("core"),
  QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'KRPBZ-VVXC4-KOMUK-DBVQQ-CIF53-P5BYE' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    classifyList: [],
    shopList: [],
    locCity: '',
    page: 1,
    total: '',
    back: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    a.loading()
    var that = this;
    this.getBannerList();
    this.getClassify();
    this.getLocal();
  },

  // 获取定位
  getLocal: function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        app.globalData.latitude = res.latitude;
        app.globalData.longitude = res.longitude;
        that.getCity(res.latitude, res.longitude)
      },
      fail(res) {
        console.log(res);
        a.hideLoading();
        that.getset();
      }
    })
  },

  // 提示授权
  getset:function(){
    var that = this;
    wx.showModal({
      title: '是否授权当前位置',
      content: '需要获取您的地理位置，请确认授权，否则无法获取您所需数据',
      showCancel: false,
      confirmText: "重新授权",
      confirmColor: '#98e165',
      success(res) {
        if (res.confirm) {
          wx.getSetting({
            success: (res) => {
              console.log(res.authSetting['scope.userLocation']);
              if (!res.authSetting['scope.userLocation']) {
                that.reset();
              }
            }
          })
        } else {

        }
      },
    })
  },

  // 重新获取授权
  reset: function(){
    var that = this;
    wx.openSetting({
      success: function (res) {
        console.log(res);
        if (res.authSetting['scope.userLocation']){
          that.getLocal();
        }else{
          that.getset();
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 获取城市
  getCity: function(latitude, longitude) {
    var that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        that.setData({
          locCity: res.result.address_component.city
        })
        app.globalData.locCity = res.result.address_component.city
        that.getShopList();
      },
      fail: function(res) {
        console.log(res)
      }
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
    if (this.data.back) {
      console.log("改变城市")
      this.setData({
        total: '',
        shopList: []
      })
      this.getShopList()
    }
  },

  // 扫码
  scanCode: function() {
    wx.scanCode({
      scanType: [],
      success: function(res) {
        console.log(res);
        wx.navigateTo({
          url: '/'+res.path,
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  // 获取轮播图
  getBannerList: function() {
    var that = this;
    a.get("/app/ewei_shopv2_api.php?i=1&r=merchshop.get_banner", {}, function(res) {
      if (res.status == 1) {
        that.setData({
          banner: res.nav,
          banner2: res.nav2
        })
      }
    })
  },

  // 获取分类
  getClassify: function() {
    var that = this;
    a.get("/app/ewei_shopv2_api.php?i=1&r=merchshop.get_onecategory", {}, function(res) {
      if (res.status == 1) {
        that.setData({
          classifyList: res.category,
        })
      }
    })
  },

  // 获取店铺
  getShopList: function() {
    var that = this;
    if (this.data.shopList.length >= this.data.total && this.data.total != '') {
      a.alert("没有更多数据了", "none");
      a.hideLoading()
      return;
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.get_merchlist", {
      page: this.data.page,
      lat: app.globalData.latitude,
      lng: app.globalData.longitude,
      city: this.data.locCity
    }, function(res) {
      console.log(res)
      var resultList = res.list;
      for (var i = 0; i < resultList.length; i++) {
        var startNum = Math.ceil(resultList[i].start);
        var startLength = [];
        for (var n = 0; n < startNum; n++) {
          startLength.push({});
        }
        if (resultList[i].distance_um > 1000) {
          resultList[i].distance_um = (resultList[i].distance_um / 1000) + 'km'
        } else {
          resultList[i].distance_um = resultList[i].distance_um + 'm'
        }
        resultList[i].startLength = startLength;
      }
      that.setData({
        total: res.total,
        shopList: that.data.shopList.concat(resultList),
      })
      a.hideLoading();
    })
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
    a.loading()
    this.setData({
      page: this.data.page += 1,
    })
    this.getShopList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})