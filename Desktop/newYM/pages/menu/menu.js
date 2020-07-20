// pages/menu/menu.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchid: '',
    tablenum: '',
    tableid: '',
    shopName: '',
    scrollId: '',
    goodsList: [],
    classList: [],
    cartInfo: {},
    scrollTop:'20',
    st: 0,
    ratio: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param = {};
    if (options.scene) {
      var scene = decodeURIComponent(options.scene).split("&");
      for(var i = 0;i<scene.length;i++){
        param[scene[i].split("=")[0]] = scene[i].split("=")[1];
      }
    }else{
      param = options;
    }
    console.log(param)
    wx.hideShareMenu()
    this.setData({
      merchid: param.mid,
      tablenum: param.tnum,
      tableid: param.tid,
      ratio: 750 / wx.getSystemInfoSync().windowWidth,
    })
    this.getMenu()
  },

  // 获取菜单
  getMenu: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.choosepay", { merchid: this.data.merchid,tablenum: this.data.tablenum,tableid: this.data.tableid},function(res){
      console.log(res);
      if(res.error!=0){
        a.alert("数据获取失败");
        return;
      }
      var category = res.category;
      var goods = res.goods;
      var goodsList = [];
      for(var i = 0;i<goods.length;i++){
        goods[i].salesreal = Number(goods[i].salesreal);
        goods[i].sales = Number(goods[i].sales);
      }
      for (var i = 0; i < category.length;i++){
        var id = category[i].id;
        var item = {
          title: category[i].name,
          id: id,
          goods: [],
        }
        for(var j = 0;j<goods.length;j++){
          if (goods[j].merch_goods_cat == id){
            item["goods"].push(goods[j]);
          }
        }
        goodsList.push(item);
      }
      that.setData({
        shopName: res.merch_detail.merchname,
        classList: res.category,
        goodsList: goodsList,
        scrollId: category[0].id,
        cartInfo: res.mycart,
        // scrollTop: that.data.st,
      })
    })
  },

  // 选择分类
  classTab: function(e){
    var id = e.currentTarget.dataset.id;
    this.setData({
      scrollId: id,
    })
  },

  // 滚动事件
  scroll: function(e){
    var scrollTop = e.detail.scrollTop;
    this.setData({
      st: scrollTop,
    })
  },
  
  // 添加商品
  add: function(e){
    var that = this;
    var id = e.currentTarget.dataset.goodsid;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.choosepay.addcart",{
      goodsid: id,
      tableid: this.data.tableid,
      merchid: this.data.merchid
    },function(res){
      console.log(res);
      if(res.error==0){
        a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.choosepay", { merchid: that.data.merchid, tablenum: that.data.tablenum, tableid: that.data.tableid },function(res){
          console.log(res);
          that.setData({
            cartInfo: res.mycart,
          })
        })
      }
    })
  },

  // 去下单
  toCart: function(e){
    var merchid = e.currentTarget.dataset.merchid;
    wx.navigateTo({
      url: '/pages/member/cart/cart?merchid=' + merchid,
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