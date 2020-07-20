// pages/dial/record.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: 1,
    isShow: false,
    subBtn: true,
    logid: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPrizeList();
  },

  getPrizeList: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.awards",{page: this.data.page},function(res){
      console.log(res);
      if(res.error==0){
        if(res.list.length==0){
          a.toast("没有更多数据了","none");
          return;
        }
        that.setData({
          list: that.data.list.concat(res.list),

        })
      }
    })
  },

  // 点击填写信息
  fillIn: function(e){
    var id = e.currentTarget.dataset.id;
    var status = e.currentTarget.dataset.status;
    var that = this;
    if(status == "请完善信息"){
      this.setData({
        isShow: true,
        logid: id,
      })
    }
  },

  // 提交信息
  submit: function (e) {
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
    }, function (res) {
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
    this.setData({
      page: this.data.page+=1,
    })
    this.getPrizeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})