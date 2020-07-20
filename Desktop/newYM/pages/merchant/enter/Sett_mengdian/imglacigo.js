// pages/imglacigo/imglacigo.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: {
      store_img1: "/static/images/icon/add.png",
      store_img2: "/static/images/icon/add.png",
      store_img3: "/static/images/icon/add.png",
      store_img4: "/static/images/icon/add.png",
      store_img5: "/static/images/icon/add.png",
      store_img6: "/static/images/icon/add.png",
      store_img7: "/static/images/icon/add.png",
      store_img8: "/static/images/icon/add.png",
      store_img9: "/static/images/icon/add.png",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getImg()
  },

  // 获取图片
  getImg: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.storebanner", {}, function(res) {
      console.log(res);
      var img = res;
      for(var i =1;i<10;i++){
        var key = "store_img"+i;
        if (img[key]==""){
          img[key] = "/static/images/icon/add.png"
        }
      }
      that.setData({
        img: img
      })
    })
  },

  // 上传图片
  upload: function(e){
    var that = this,
    type = e.currentTarget.dataset.type;
    a.upload(function (res) {
      console.log(res)
      that.setData({
        ["img."+type]: res.tomedia_img,
      })
      that.upData(res.url,type);
    })
  },

  // 更新照片
  upData: function(url,type){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.upstorebanner",{
      url: url,
      upimgname: type,
    },function(res){
      console.log(res);
      if(res.status==1){
        a.success(res.message);
      }else{
        a.toast(res.message,"none")
      }
    })
  },

  // 删除
  del: function(e){
    var type = e.currentTarget.dataset.type;
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.delstorebanner",{
      upimgname: type,
    },function(res){
      console.log(res);
      if(res.status==1){
        a.success("删除成功")
        that.setData({
          ["img." + type]: "/static/images/icon/add.png",
        })
      }else{
        a.toast(res.message,"none")
      }
    })
  },

  // 确定
  confirm: function(){
    console.log(this.data.img['store_img1']);
    if (this.data.img['store_img1'] == "/static/images/icon/add.png" || this.data.img['store_img1'] ==""){
      a.alert("首图不能为空");

    }else{
      wx.redirectTo({
        url: '/pages/merchant/enter/Sett_mengdian/Sett_mengdian',
      })
    }
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