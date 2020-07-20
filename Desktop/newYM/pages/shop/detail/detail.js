// pages/shop/detail/detail.js
var app = getApp(),
  a = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据参数
    shopInfo: {},
    bannerList: [],
    star: 0,
    youhui: {},
    teambuy: {},
    goodsList: [],
    commentList: [],
    total: '',
    isLike: 0,
    cartPrice: 0,
    cartTotal: 0,
    // 请求参数
    shopId: '',
    page: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopId: options.id
    })
    this.getGoodsList(options.id)
  },

  // 收藏
  collect: function(){
    var iscollect = this.data.isLike==0?'yes':'no';
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore.collect",{
      iscollect: iscollect,
      merchid: this.data.shopId,
      type: 0
    },function(res){
      console.log(res);
      if(res.islike==1){
        that.setData({
          isLike: 1,
        })
      }else{
        that.setData({
          isLike: 0,
        })
      }
    })
  },

  // 获取店铺信息
  getShopInfo: function (id) {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore", {
      storeid: id,
    },function(res){
      console.log(res);
      that.setData({
        bannerList: res.banner_img,
        shopInfo: res.merch_detail,
        star: parseInt(res.merch_detail.start),
        youhui: res.youhui,
        teambuy: res.teambuy,
        isLike: res.is_like,
        cartTotal: res.mycart.sumtotal,
        cartPrice: res.mycart.summarketprice,
      })
    })
  },

  // 获取店铺列表
  getGoodsList: function(id){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore.getmerchgoodslist", {merchid: id},function(res){
      console.log(res);
      that.setData({
        goodsList: res.goodslist,
      })
    })
  },

  // 打电话
  call: function(){
    wx.makePhoneCall({
      phoneNumber: this.data.shopInfo.storephone,
    })
  },

  // 获取店铺评论
  getcomment:function(){
    var that = this;
    if (this.data.total != '' && this.data.commentList.length >= this.data.total) {
      a.alert("没有更多评论了");
      return;
    }
    a.loading();
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore.get_commentlist",{
      merchid: this.data.shopId,
      page: this.data.page,
    },function(res){
      console.log(res);
      that.setData({
        commentList: that.data.commentList.concat(res.list),
        total: res.total,
      })
      a.hideLoading();
    })
  },

  // 查看图片
  viewImg: function(e){
    var imgList = e.currentTarget.dataset.imglist;
    console.log(imgList);
  },
  
  // 加入购物车
  inCart: function(e){
    var that = this;
    var id = e.currentTarget.dataset.goodsid;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore.addcart",{
      goodsid: id,
      merchid: this.data.shopId
    },function(res){
      console.log(res)
      if (res.sumtotal){
        that.setData({
          cartTotal: res.sumtotal,
          cartPrice: res.summarketprice,
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
    this.getShopInfo(this.data.shopId);

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
    if (this.data.total === "" || this.data.total > this.data.commentList.length) {
      this.setData({
        page: this.data.page += 1
      })
    }
    this.getcomment();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})