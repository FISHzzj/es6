// pages/shop/detail/orderConfirm.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchid: '',
    merchDetail: {},
    youhuiInfo: {},
    deduction: false,
    credit2: '',
    discounts: "0.00",
    isdiscounts: 0,
    price: '0.00',
    sum: 0,
    xfSum: 0,
    bcySum: 0,
    removemoney:'',
    moneyappoint: '', 
    discountsNum: '',
    isShow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var param = {};
    if (options.scene) {
      var scene = decodeURIComponent(options.scene).split("&");
      for (var i = 0; i < scene.length; i++) {
        param[scene[i].split("=")[0]] = scene[i].split("=")[1];
      }
    } else {
      param = options;
    }
    console.log(param)
    if (param!=""){
      a.post("wxapp/bindpid", { merch: param.merch},function(res){
        console.log(res)
      })
    }
    var merchid = param.merchid || param.merch
    this.setData({
      merchid: merchid,
    })
    this.getOrderInfo();
  },

  // 获取订单信息
  getOrderInfo: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.youhuipay", { merchid: this.data.merchid},function(res){
      console.log(res);
      if(res.error==0){
        that.setData({
          merchDetail: res.merch_detail,
          youhuiInfo: res.youhuisetting,
          credit2: res.credit2,
          discountsNum: res.credit2
        })
      }
    })
  },

  // 输入消费金额
  xiaofei: function(e){
    var that = this;
    var value = Number(e.detail.value);
    var bcySum = Number(this.data.bcySum);
    var discounts = Number(this.data.discounts);
    var removemoney = Number(that.data.youhuiInfo.removemoney),
      moneyappoint = Number(that.data.youhuiInfo.moneyappoint);
    var sum = value - ((value - bcySum) / moneyappoint * removemoney)
    this.setData({
      price: (sum - discounts).toFixed(2) > 0 ? (sum - discounts).toFixed(2) : 0,
      xfSum:value,
      sum : sum,
      discountsNum: that.data.credit2 - sum > 0 ? (that.data.credit2 - sum).toFixed(2):0
    })
  },

  nonparticipator: function(){
    this.setData({
      isShow: !this.data.isShow
    })
  },

  // 输入不参与优惠金额
  bucanyu: function (e) {
    var that = this;
    var value = Number(e.detail.value);
    var xfSum = Number(this.data.xfSum);
    var discounts = Number(this.data.discounts);
    var removemoney = Number(that.data.youhuiInfo.removemoney),
      moneyappoint = Number(that.data.youhuiInfo.moneyappoint);
    var sum = xfSum - ((xfSum - value) / moneyappoint * removemoney)
    this.setData({
      bcySum: value
    })
    if (this.data.xfSum<=0){
      a.toast("消费金额必须大于0","none");
      return
    }
    this.setData({
      price: (sum - discounts).toFixed(2) > 0 ? (sum - discounts).toFixed(2) : 0,
      sum: sum,
      discountsNum: that.data.credit2 - sum > 0 ? (that.data.credit2 - sum).toFixed(2) : 0
    })
  },

  // 是否抵扣
  // switchChange: function (e) {
  //   var that = this;
  //   if (e.detail.value){
  //     this.setData({
  //       discounts: this.data.credit2,
  //       isdiscounts: 1
  //     })
  //   }else{
  //     this.setData({
  //       discounts: 0,
  //       isdiscounts:0
  //     })
  //   }
  //   var xfSum = Number(this.data.xfSum);
  //   var bcySum = Number(this.data.bcySum);
  //   var discounts = Number(this.data.discounts);
  //   var removemoney = Number(that.data.youhuiInfo.removemoney),
  //     moneyappoint = Number(that.data.youhuiInfo.moneyappoint);
  //   var sum = xfSum - ((xfSum - bcySum) / moneyappoint * removemoney);
  //   if (e.detail.value) {
  //     this.setData({
  //       discountsNum: that.data.credit2 - sum > 0 ? (that.data.credit2 - sum).toFixed(2) : 0,
  //     })
  //   } else {
  //     this.setData({
  //       discountsNum: that.data.credit2,
  //     })
  //   }
  //   this.setData({
  //     price: (sum - discounts).toFixed(2) > 0 ? sum.toFixed(2):0, 

  //   })
    
  // },

  // 支付
  pay: function(){
    var that = this;
    if (this.data.xfSum==0){
      a.toast("请输入正确的消费金额","none");
      return
    } else if (this.data.xfSum<=this.data.bcySum){
      a.toast("不参与优惠金额过大", "none");
      return
    }
    var xfSum = Number(this.data.xfSum);
    var bcySum = Number(this.data.bcySum);
    var discounts = Number(this.data.discounts);
    var removemoney = Number(that.data.youhuiInfo.removemoney),
      moneyappoint = Number(that.data.youhuiInfo.moneyappoint);
    var sum = xfSum - ((xfSum - bcySum) / moneyappoint * removemoney);
    // wx.showModal({
    //   title: '提示',
    //   content: '是否已与商家确认过金额？',
    //   success(){
        a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.youhuipay.creatyouhuiorder",{
          paytype: "wechat",
          money: that.data.xfSum,
          redp_deduction: 0,
          deduction: 0,
          nomoney: that.data.bcySum,
          realmoney: that.data.price,
          redpacket: that.data.youhuiInfo.redpacket,
          youhuiid: that.data.youhuiInfo.id,
          merchid: that.data.merchDetail.id,
          youhuiname: that.data.youhuiInfo.name
        },function(res){
          console.log(res);
          if(res.error==0){
            wx.redirectTo({
              url: '/pages/pay/pay?orderid=' + res.orderinfo.id,
            })
          }
        })
      // }
    // })
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