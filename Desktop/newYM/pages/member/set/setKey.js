// pages/member/set/setKey.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      account: options.account,
    })
  },

  // 提交
  submit: function(e){
    var formData = e.detail.value;
    console.log(formData)
    if(formData.key===formData.reKey){
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.info.updatamerchpwd", { pwd: formData.reKey},function(res){
        console.log(res);
        if (res.status==1){
          a.success(res.info);
          wx.navigateBack({
            
          })
        }else{
          a.toast(res.info,"none");
        }
      })
    }else{
      a.alert("两次密码输入不一致，请确认后提交");
    }
    
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