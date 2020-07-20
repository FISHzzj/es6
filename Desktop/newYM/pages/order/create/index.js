// pages/popularize/popularize.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [],
    totalPrice: '',
    disPrice: '',
    isNoPay: false,
    merchid: '',
    isSubmit: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      merchid: options.merchid,
    })
    this.getOrderInfo()
  },

  // 获取订单信息
  getOrderInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=order.create", { merchid: this.data.merchid}, function(res) {
      console.log(res);
      var list = res.goods;
      for (var i = 0; i < list.length; i++) {
        var shopId = Number(list[i].merchid)
        list[i].ggprice = res.merchs[shopId].ggprice
        var num = 0;
        var goodsList = list[i].goods;
        for (var j = 0; j < goodsList.length; j++) {
          num += Number(goodsList[j].total);
        }
        console.log(num);
        list[i].total = num;
      }
      that.setData({
        shopList: list,
        totalPrice: res.needpay
      })
    })
  },


  // 立即下单
  confirm: function(){
    var that = this;
    var list = this.data.shopList;
    var goods = [];
    if(this.data.isNoPay){
      a.toast("无法支付，请确认流程");
      return;
    }
    this.setData({
      isSubmit: true,
    })
    for(var i = 0;i<list.length;i++){
      var goodsList = list[i].goods;
      for(var j = 0;j<goodsList.length;j++){
        var item = {
          goodsid: goodsList[j].goodsid,
          marketprice: goodsList[j].marketprice,
          merchid: goodsList[j].merchid,
          optionid: goodsList[j].optionid,
          total: goodsList[j].total,
          type: 1
        };
        goods.push(item);
      }
    }
    console.log(goods);
    a.post("/app/ewei_shopv2_api.php?i=1&r=order.create.submit", { goods: goods},function(res){
      console.log(res)
      if(res.error ==0){
        wx.redirectTo({
          url: '/pages/pay/pay?orderid='+res.orderid,
        })
      }else{
        a.toast("下单失败","none");

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