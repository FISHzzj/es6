// pages/search/nearby.js
var app = getApp(),
  a = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "all",
    city: '',
    DCode: 1,
    districtList: [],
    streetList: [],
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
    shopList: [],
    total: '',
    page: 1,
    meter: '',
    area: '',
    region: '',
    goodstar: 0,
    saleheight: 0,
    isFujin: false,
    isMask: false,
    isSort: false,
    sortType: "智能排序",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      city: app.globalData.locCity
    })
    this.getShopList();
  },

  // 获取店铺
  getShopList: function() {
    var that = this;
    if (this.data.shopList.length >= this.data.total && this.data.total != '') {
      a.alert("没有更多数据了", "none");
      a.hideLoading()
      return;
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.getnearby", {
      page: this.data.page,
      lat: app.globalData.latitude,
      lng: app.globalData.longitude,
      city: app.globalData.locCity,
      meter: this.data.meter,
      area: this.data.area,
      region: this.data.region,
      goodstar: this.data.goodstar,
      saleheight: this.data.saleheight
    }, function(res) {
      console.log(res)
      var resultList = res.list;
      if(resultList.length>0){
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
      }else{
        that.setData({
          total: that.data.shopList.length,
        })
      }
      a.hideLoading()
    })
  },

  // 点击搜索框
  focus: function() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 点击筛选框
  filtrate: function(e) {
    var type = e.currentTarget.dataset.type;
    var that = this;
    that.setData({
      type: type,
    })
    if (type == 'all') {
      that.setData({
        shopList: [],
        meter: '',
        area: '',
        region: '',
        goodstar: 0,
        saleheight: 0,
        isFujin: false,
        isSort: false,
        isMask: false,
      })
      this.getShopList();
    } else if (type == 'fujin') {
      a.post('/app/ewei_shopv2_api.php?i=1&r=merchshop.getarea', {
        city: that.data.city
      }, function(res) {
        console.log(res);
        if (res.count > 0) {
          that.setData({
            districtList: res.area,
            isSort: false,
            isMask: true,
            isFujin: true
          })
        }
      })
    } else if (type =='zhineng'){
      that.setData({
        isFujin: false,
        isMask: true,
        isSort: true,
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
    if (meter){
      this.setData({
        meter: meter,
      })
    }else{
      this.setData({
        region: street
      })
    }
    this.getShopList();
  },

  // 排序方式
  sort: function(e){
    var that = this;
    var sort = e.currentTarget.dataset.sort;
    this.setData({
      page: 1,
      shopList: [],
      total: '',
    })
    if (sort == 'default'){
      that.setData({
        meter: '',
        area: '',
        region: '',
        goodstar: 0,
        saleheight: 0,
        sortType: "智能排序",
        isSort: false,
        isMask: false,
      })
      this.getShopList();
    } else if (sort == 'nearest'){
      that.setData({
        goodstar: 0,
        saleheight: 0,
        sortType: "离我最近",
        isSort: false,
        isMask: false,
      })
      this.getShopList();
    } else if (sort == 'good'){
      this.setData({
        goodstar: 1,
        isSort: false,
        isMask: false,
        sortType: "好评优先"
      })
      this.getShopList();
    } else {
      this.setData({
        saleheight: 1,
        isSort: false,
        isMask: false,
        sortType: "人气最高"
      })
      this.getShopList();
    }
  },

  // 关闭窗口
  close: function(){
    this.setData({
      isMask:false,
      isFujin:false,
      isSort: false,
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