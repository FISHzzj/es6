// pages/goods/hotelDetail/hotelOrder.js
var app = getApp(),
    a = app.requirejs("core")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomNum: 1,
    checkInList: [{
      index: 1,
      value: '',
    }],
    checkInTime: "14:00",
    merchid: '',
    goodsid: '',
    startdate: '',
    enddate: '',
    detail: {},
    info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      merchid: options.merchid,
      goodsid: options.goodsid,
      startdate: options.startdate,
      enddate: options.enddate,
    })
    this.getInfo();
  },

  // 获取商品信息
  getInfo: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.hotelorder",{
      merchid: this.data.merchid,
      goodsid: this.data.goodsid,
      startdate: this.data.startdate,
      enddate: this.data.enddate,
    },function(res){
      console.log(res);
      that.setData({
        detail: res.merch_detail,
        info: Object.assign(res.goodsinfo, res.timelimit)
      })
    })
  },

  // 减
  minus: function(){
    if(this.data.roomNum>1){
      this.setData({
        roomNum: this.data.roomNum-=1
      })
    }else{
      a.alert("房间不能再少了")
    }
    this.adjust();
  },

  // 加
  plus: function(){
    this.setData({
      roomNum: this.data.roomNum += 1
    })
    this.adjust();
  },

  // 调整房间数
  adjust: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.hotelorder.checkplus",{
      startdate: this.data.startdate,
      enddate: this.data.enddate,
      goodsid: this.data.goodsid,
      count_days: this.data.roomNum,
    },function(res){
      console.log(res);
      if (res.status==1){
        that.checkIn();
      }else{
        a.toast("当前房间不足","none");
        that.setData({
          roomNum: that.data.roomNum-=1,
        })
      }
    })
  },

  // 入住人数据
  checkIn: function(){
    var num = this.data.roomNum;
    var list = [];
    for(var i = 1;i<=num;i++){
      var item = {
        index : i,
        value : ''
      }
      list.push(item);
    }
    this.setData({
      checkInList: list
    })
  },

  // 打开timePicker
  bindTimeChange: function(e){
    console.log(e)
    var time = e.detail.value
    this.setData({
      checkInTime: time
    })
  },

  // 表单提交
  submit: function(e){
    var formData = e.detail.value;
    formData.names = [];
    var failIcon = this.data.failIcon;
    var that = this;
    var reg = /^1(3|4|5|7|8)\d{9}$/;
    for(var i = 0;i<this.data.roomNum;i++){
      formData.names.push(formData["names" + i]);
    }
    console.log(formData);
    for(var i = 0;i<formData.names.length;i++){
      if (formData.names[i] == '') {
        a.toast("请完整填写入住人", "none", failIcon);
        return;
      }
    }
    if (!(reg.test(formData.phone))){
      a.toast("请填写手机号码", "none", failIcon);
      return;
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.hotelorder.createhotelorder",{
      names: formData.names,
      num: this.data.roomNum,
      phone: formData.phone,
      showBank: formData.showBank,
      goodsid: this.data.goodsid,
      merchid: this.data.merchid,
      startdate: this.data.startdate,
      enddate: this.data.enddate,
    },function(res){
      console.log(res);
      if(res.status==1){
        wx.redirectTo({
          url: '/pages/pay/pay?orderid=' + res.orderid,
        })
      }else{
        a.alert("下单失败！")
      }
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