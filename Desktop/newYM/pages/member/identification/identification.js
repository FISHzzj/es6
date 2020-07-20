// pages/member/identification/identification.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  // 认证
  submit: function(e) {
    var formData = e.detail.value;
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (formData.name == "") {
      a.toast("请填写真实姓名");
      return;
    } else if (!(reg.test(formData.idcard))) {
      a.toast("请输入正确的身份证号码", "none");
      return;
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.authentication.checkidcard", {
      name: formData.name,
      idcard: formData.idcard,
    }, function(res) {
      console.log(res);
      if (res.status == 1) {
        app.globalData.authInfo = res.result;
        wx.redirectTo({
          url: '/pages/member/identification/complete',
        })
      }else{
        a.toast(res.message,"none")
      }
    })
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