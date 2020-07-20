// pages/order/groupOrder/index.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    merchid: "",
    merchDetail: {},
    goodsInfo: {},
    exPrice: '',
    disPrice: '',
    orderPrice: '',
    num: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
      merchid: options.merchid
    })
    this.getGroupInfo();
  },

  // 获取团购信息
  getGroupInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.groupbuy.confirmorder", {
      id: this.data.id,
      merchid: this.data.merchid
    }, function(res) {
      console.log(res);
      if(res.error==0){
        that.setData({
          merchDetail: res.merch_detail,
          goodsInfo: res.teambuysetting,
          exPrice: res.teambuysetting.storeprice,
          disPrice: res.discount_price,
          orderPrice: res.teambuysetting.itemprice,
          info: res,
        })
      }
    })
  },

  // 减
  minus: function(){
    var num = Number(this.data.num);
    if(num<=1){
      a.toast("购买数量不能少于1","none");
      return;
    }
    num-=1;
    this.setData({
      exPrice: (Number(this.data.goodsInfo.storeprice)*num).toFixed(2),
      disPrice: (Number(this.data.info.discount_price) * num).toFixed(2),
      orderPrice: (Number(this.data.goodsInfo.itemprice) * num).toFixed(2),
      num: num,
    })
  },

  // 加
  plus: function(){
    var num = Number(this.data.num);
    // if (num <= 1) {
    //   a.toast("购买数量不能少于1");
    //   return;
    // }
    num += 1;
    this.setData({
      exPrice: (Number(this.data.goodsInfo.storeprice) * num).toFixed(2),
      disPrice: (Number(this.data.info.discount_price) * num).toFixed(2),
      orderPrice: (Number(this.data.goodsInfo.itemprice) * num).toFixed(2),
      num: num,
    })
  },

  // 确认订单
  confirm: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.groupbuy.creatgrouporder",{
      merchid: this.data.merchid,
      groupid: this.data.id,
      total: this.data.num,
    },function(res){
      console.log(res);
      if(res.error==0){
        wx.redirectTo({
          url: '/pages/pay/pay?orderid='+res.orderid,
        })
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