// pages/search/search.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classifyList: [],
    page: 1,
    total: 10,
    shopList: [],
    oneid: '',
    twoId: '',
    inpValue: '',
    act: '',
    isClassify: true,
    isShop: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.setData({
        oneid: options.id,
      })
      a.loading();
      this.getClassifyList();
      this.getShopList();
    }else{
      this.setData({
        isClassify: false,
      })
    }
  },

  // input焦点事件
  focus: function(){
    this.setData({
      isClassify: false,
      isShop: false,
    })
  },
  
  // input失焦事件
  blur: function(){
    if (this.data.oneid!=''){
      this.setData({
        isClassify: true,
        isShop: true,
      })
    }
  },

  // input输入事件
  inp: function(e){
    var value = e.detail.value;
    this.setData({
      inpValue: value,
    })
  },

  // 点击搜索
  search: function(){
    var that = this;
    if (this.data.inpValue==''){
      a.alert("搜索内容不能为空！");
      return;
    }
    a.loading();
    this.setData({
      oneid: '',
      twoId: '',
      shopList: [],
      isShop: true,
      total: ''
    })
    this.searchShop()
    
  },

  // 搜索商品列表
  searchShop: function(){
    var that = this;
    if (this.data.shopList.length >= this.data.total && this.data.total != '') {
      a.alert("没有更多数据了", "none");
      a.hideLoading()
      return;
    }
    a.post('/app/ewei_shopv2_api.php?i=1&r=merchshop.search.get_merchlist', {
      page: this.data.page,
      lat: app.globalData.latitude,
      lng: app.globalData.longitude,
      searchval: this.data.inpValue,
    }, function (res) {
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


  // 获取店铺
  getShopList: function() {
    var that = this;
    if (this.data.shopList.length >= this.data.total && this.data.total != '') {
      a.alert("没有更多数据了", "none");
      a.hideLoading()
      return;
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.twocategory.get_merchlist", {
      page: this.data.page,
      oneid: this.data.oneid,
      lat: app.globalData.latitude,
      lng: app.globalData.longitude,
      city: app.globalData.locCity,
      twocatid: this.data.twoId,
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

  // 获取分类列表
  getClassifyList() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.twocategory.get_twocategory", {
      id: this.data.oneid
    }, function(res) {
      console.log(res);
      var list = [];
      var n = 0;
      list[n] = [];
      var resultList = res.category;
      for (var i = 0; i < resultList.length; i++) {
        if (i % 10 == 0 && i != 0) {
          n += 1;
          list[n] = [];
          list[n].push(resultList[i]);

        } else {
          list[n].push(resultList[i])
        }
      }
      that.setData({
        classifyList: list,
      })
    })
  },

  // 二级分类
  secondary: function(e) {
    var twoId = e.currentTarget.dataset.id;
    var ishotelurl = e.currentTarget.dataset.ishotelurl;
    if(ishotelurl==0){
      this.setData({
        act: twoId,
        twoId: twoId,
        page: 1,
        shopList: [],
        total: '',
        inpValue: ''
      })
      this.getShopList();
    }else{
      wx.navigateTo({
        url: 'hotel?id='+twoId,
      })
    }
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
    if(this.data.inpValue==''){
      this.getShopList();
    }else{
      this.searchShop()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})