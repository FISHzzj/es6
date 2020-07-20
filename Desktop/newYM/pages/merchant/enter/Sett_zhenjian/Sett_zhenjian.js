// pages/Sett_zhenjian/Sett_zhenjian.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businesslicense_img: '',
    businesscertificate_img: '',
    idcard_front_img: '',
    idcard_back_img: '',
    promiseopen_img: '',
    else_image: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

  },

  // 上传图片
  upload: function (t) {
    var e = this,
      i = a.data(t),
      s = i.type,
      key = t.currentTarget.dataset.key,
      r = i.index;
    a.upload(function (t) {
      console.log(t)
      e.setData({
        [key]: t.tomedia_img,
      })
      e.upPapers(key, t.url)
    })
  },

  // 上传证件
  upPapers: function(key,url){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.upstorebanner",{
      url: url,
      upimgname: key,
    },function(res){
      console.log(res);
      if (res.status==1){
        a.success(res.message)
      }else{
        a.toast(res.message,"none")
      }
      
    })
  },

  // 删除照片
  del: function(e){
    var key = e.currentTarget.dataset.key;
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.delstorebanner",{
      upimgname: key,
    },function(res){
      console.log(res);
      if(res.status==1){
        a.success(res.message);
        that.setData({
          [key]: ''
        })
      }else{
        a.toast(res.message,"none")
      }
    })
  },

  // 下一步
  next: function(){
    if (this.data.businesslicense_img==""){
      a.toast("请上传营业执照","none");
      return;
    } else if (this.data.businesscertificate_img == "") {
      a.toast("请上传经营许可证", "none");
      return;
    } else if (this.data.idcard_front_img == "") {
      a.toast("请上传身份证正面", "none");
      return;
    } else if (this.data.idcard_back_img == "") {
      a.toast("请上传身份证反面", "none");
      return;
    } else if (this.data.promiseopen_img == "") {
      a.toast("请上传开户证", "none");
      return;
    }
    wx.redirectTo({
      url: '/pages/merchant/enter/Sett_xianmu/Sett_xianmu',
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