// pages/dial/dial.js
var app = getApp(),
  a = app.requirejs("core");
const query = wx.createSelectorQuery();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    select: '',
    data: {},
    rollNum: '',
    isShow: false,
    award: {},
    credit1: "",
    goods: [],
    trunbtn: true,
    subBtn: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
  },

  // 获取数据
  getData() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.rotaryactivities.gettivitiesstatus", {}, function(res) {
      console.log(res);
      if (res.error == 0) {
        res.award.push({});
        that.setData({
          list: res.award,
          data: res,
          credit1: res.credit1,
        })
        that.roll();
      }
    })
  },

  // 转动
  trun: function(key) {
    var that = this;
    var index = 0;
    var end = 24 + Number(key);
    var trun = setInterval(() => {
      if (index < end) {
        index += 1;
        this.setData({
          select: index % 8 == 0 ? 8 : index % 8,
        })
      } else {
        that.gingo();
        clearInterval(trun);
      }
    }, 150)
  },

  // 开始抽奖
  begin: function() {
    var that = this;
    if (!this.data.trunbtn) {
      return;
    }
    this.setData({
      trunbtn: false
    })
    a.get("/app/ewei_shopv2_api.php?i=1&r=member.rotaryactivities.getrandom", {}, function(res) {
      console.log(res);
      if (res.status == 1) {
        var key = res.award.award.key;
        that.trun(key);
        that.setData({
          award: res.award.award,
        })
      } else {
        a.alert(res.message);
        that.setData({
          trunbtn: true
        })
      }
    })
  },

  // 处理奖项
  gingo: function() {
    var that = this;
    var award = this.data.award;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.rotaryactivities.awardHandle", {
      award: {
        id: award.id,
        title: award.title,
        type: award.type,
        price: award.price,
        total: award.total,
        bonus: award.bonus,
        goodsid: award.goodsid,
        status: award.status,
      }
    }, function(res) {
      console.log(res);
      if (res.error == 0) {
        that.setData({
          credit1: res.credit1
        })
        if (res.type == 2) {
          that.setData({
            isShow: true,
            goods: res.goods,
            logid: res.logid
          })
        }else{
          a.alert("恭喜抽中" + that.data.award.title);
        }
      } else {
        a.alert("error，发生未知错误")
        that.setData({
          trunbtn: true
        })
      }
    })
  },

  // 滚动
  roll: function() {
    var num = 0
    var that = this;
    var roll = setInterval(() => {
      if (num < that.data.data.awards_list.length) {
        that.setData({
          rollNum: num
        })
        num += 1;
      } else {
        that.setData({
          rollNum: 'null'
        })
        num = 0;
      }
    }, 1500)
  },

  // 提交信息
  submit: function(e) {
    var formData = e.detail.value;
    var that = this;
    console.log(formData);
    if (formData.consignee == "") {
      a.toast("收件人不能为空", "none");
      return;
    } else if (formData.address == "") {
      a.toast("收件地址不能为空", "none");
      return
    } else if (formData.mobile == "") {
      a.toast("手机号码不能为空", "none");
      return
    }
    that.setData({
      subBtn: false,
    })
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.rotaryactivities.editInformation", {
      logid: that.data.logid,
      consignee: formData.consignee,
      address: formData.address,
      mobile: formData.mobile,
    }, function(res) {
      console.log(res);
      if (res.status == 1) {
        a.alert(res.message);
        that.setData({
          isShow: false,
          trunbtn: true,
          subBtn: true,
        })
      } else {
        a.toast("未知错误，请重试", "none")
        that.setData({
          subBtn: true,
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