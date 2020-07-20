// pages/sketch/sketch.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    imgs: [],
    imgurl: [],
    sketch: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

  },

  // 上传图片
  upload: function(t) {
    var e = this,
      i = a.data(t),
      s = i.type,
      n = e.data.images,
      o = e.data.imgs,
      l = e.data.imgurl,
      r = i.index;
    "image" == s ? a.upload(function(t) {
      console.log(t)
      n.push(t.tomedia_img);
      l.push(t.filename);
      console.log(n)
      o.push(t.tomedia_img), e.setData({
        images: n,
        imgs: o
      })
    }) : "image-remove" == s ? (n.splice(r, 1), o.splice(r, 1), e.setData({
      images: n,
      imgs: o
    })) : "image-preview" == s && wx.previewImage({
      current: o[r],
      urls: o
    })
  },

  // 输入简述
  sketch: function(e) {
    var sketch = e.detail.value;
    this.setData({
      sketch: sketch,
    })
  },

  // 删除图片
  del: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index);
    this.data.images.splice(index, 1);
    this.setData({
      images: this.data.images,
    })
  },

  // 完成
  submit: function() {
    a.loading();
    var jsonA = app.globalData.projectInfo;
    var that = this;
    console.log(jsonA);
    jsonA.description = this.data.sketch,
      jsonA.imgurl = this.data.imgurl,
      a.post("/app/ewei_shopv2_api.php?i=1&r=merch.groupbuy.itemadd", {
      data: jsonA
      }, function(res) {
        console.log(res);
        a.hideLoading();
        a.alert(res.info);
        if (res.status == 1) {
          wx.redirectTo({
            url: '/pages/merchant/teamBuy/list/list',
          })
          app.globalData.projectInfo = {};
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