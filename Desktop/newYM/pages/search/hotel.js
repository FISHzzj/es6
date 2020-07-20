// pages/search/hotel.js
var app = getApp(),
  a = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 全局参数
    type: "all",
    city: '',
    DCode: 1,
    page: 1,
    total: '',
    minPrice: 0,
    maxPrice: 1000,
    priceSection: '不限价格',
    // 请求参数
    meter: '',
    region: '',
    hotel_star: '',
    hotel_price: '',
    smart: '',
    // 数组数据
    shopList: [],
    districtList: [],
    nbList: [{
      "text": "附近",
      "meter": ""
    }, {
      "text": "1千米",
      "meter": 1
    }, {
      "text": "3千米",
      "meter": 3
    }, {
      "text": "5千米",
      "meter": 5
    }, {
      "text": "10千米",
      "meter": 10
    }, {
      "text": "全城",
      "meter": 0
    }, ],
    // 显示参数
    isFujin: false,
    isMask: false,
    isSort: false,
    isLevel: false,
    sortType: "智能排序",
    minPrice: '',
    level: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var btnRight = 0;
    var that = this;
    console.log(btnRight)
    this.setData({
      city: app.globalData.locCity
      // city: options.city,
    })
    this.getShopList();
  },

  toLocation: function(){
    wx.navigateTo({
      url: '/pages/location/location?locCity='+this.data.city,
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
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.hotellist", {
      page: this.data.page,
      lat: app.globalData.latitude,
      lng: app.globalData.longitude,
      city: app.globalData.locCity,
      meter: this.data.meter,
      area: this.data.area,
      region: this.data.region,
      hotel_star: this.data.level,
      hotel_price: this.data.hotel_price,
      smart: this.data.smart,
    }, function(res) {
      console.log(res)
      var resultList = res.list;
      if (resultList.length > 0) {
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
      } else {
        that.setData({
          total: that.data.shopList.length,
        })
      }
      a.hideLoading()
    })
  },

  // 点击筛选框
  filtrate: function(e) {
    var type = e.currentTarget.dataset.type;
    var that = this;
    that.setData({
      type: type,
    })
    if (type == 'level') {
      that.setData({
        isLevel: true,
        isMask: true,
        isSort: false,
        isFujin: false,
      })
    } else if (type == 'fujin') {
      a.post('/app/ewei_shopv2_api.php?i=1&r=merchshop.getarea', {
        city: that.data.city
      }, function(res) {
        if (res.count > 0) {
          that.setData({
            districtList: res.area,
            isSort: false,
            isMask: true,
            isFujin: true,
            isLevel: false,
          })
        }
      })
    } else if (type == 'zhineng') {
      that.setData({
        isFujin: false,
        isMask: true,
        isSort: true,
        isLevel: false,
      })
    }
  },

  // 选区
  dctSelect: function(e) {
    var code = e.currentTarget.dataset.code;
    var area = e.currentTarget.dataset.area;
    var that = this;
    that.setData({
      DCode: code,
      area: area
    })
    if (code != 1) {
      a.post('/app/ewei_shopv2_api.php?i=1&r=merchshop.getarea.getstreetbycode', {
        code: code
      }, function(res) {
        console.log(res)
        if (res.count > 0) {
          that.setData({
            streetList: res.street,
          })
        }
      })
    } else {
      that.setData({
        DCode: 1
      })
    }
  },

  // 选择街道
  stSelect: function(e) {
    var street = e.currentTarget.dataset.street;
    var meter = e.currentTarget.dataset.meter;
    var that = this;
    this.setData({
      page: 1,
      isMask: false,
      isFujin: false,
      shopList: [],
      total: '',
    })
    if (meter) {
      this.setData({
        meter: meter,
      })
    } else {
      this.setData({
        region: street
      })
    }
    this.getShopList();
  },

  // 选择酒店等级
  selectStar: function(e) {
    var level = e.currentTarget.dataset.star;
    this.setData({
      level: level
    })
  },

  // 选择价格区间
  selectPrice: function(e) {
    var min = e.currentTarget.dataset.min;
    var max = e.currentTarget.dataset.max;
    this.setData({
      hotel_price: min + '-' + max,
      minPrice: min,

    })
    if (min == 0) {
      this.setData({
        priceSection: '150以下',
      })
    } else if (min == 1000) {
      this.setData({
        priceSection: '1000以上'
      })
    } else {
      this.setData({
        priceSection: min + '-' + max
      })
    }
  },

  reset: function() {
    this.setData({
      hotel_price: '',
      minPrice: '',
      level: '',
      priceSection: '不限价格',
    })
  },

  fulfill: function() {
    this.setData({
      page: 1,
      shopList: [],
      smart: ''
    })
    this.getShopList();
    this.close()
  },

  sort: function(e) {
    var that = this;
    var sort = e.currentTarget.dataset.sort;
    this.setData({
      page: 1,
      shopList: [],
      total: '',
      hotel_star: '',
      hotel_price: '',
    })
    if (sort == 'default') {
      that.setData({
        meter: '',
        area: '',
        region: '',
        smart: '',
        sortType: "智能排序",
        isSort: false,
        isMask: false,
      })
      this.getShopList();
    } else if (sort == 'nearest') {
      that.setData({
        sortType: "距离 近到远",
        isSort: false,
        isMask: false,
      })
      this.getShopList();
    } else if (sort == 'good') {
      this.setData({
        smart: 'heightgrade',
        isSort: false,
        isMask: false,
        sortType: "评分 高到低"
      })
      this.getShopList();
    } else if (sort == 'inexpensive') {
      this.setData({
        smart: 'lowprice',
        isSort: false,
        isMask: false,
        sortType: "价格 低到高"
      })
      this.getShopList();
    } else {
      this.setData({
        smart: 'heightprice',
        isSort: false,
        isMask: false,
        sortType: "价格 低到高"
      })
      this.getShopList();
    }
  },

  // 关闭窗口
  close: function() {
    this.setData({
      isMask: false,
      isFujin: false,
      isSort: false,
      isLevel: false,
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
    this.setData({
      city: app.globalData.locCity
      // city: options.city,
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