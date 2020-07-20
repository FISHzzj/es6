// pages/goods/goodDetail/goodDetail.js
var app = getApp(),
  a = app.requirejs('core');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面数据
    bannerList: [],
    commentList: [],
    goodsList: [],
    total: 0,
    shopImg: '',
    goodsInfo: {},
    isDetail: false,
    isLike: 0,
    // 请求参数
    page: 0,
    goodsId: '',
    shopId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      goodsId: options.goodsid,
      shopId: options.merchid,
    })
    this.getGoodsInfo();
  },

  // 获取团购信息
  getGoodsInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.groupbuy", {
      id: this.data.goodsId,
      merchid: this.data.shopId
    }, function(res) {
      console.log(res);
      res.teambuy_setting.redpacket = res.teambuy_setting.itemprice * (res.teambuy_setting.redenveloperatio / 100);
      that.setData({
        goodsInfo: res.teambuy_setting,
        bannerList: res.mickyhouse,
        goodsList: res.goodslist,
        isLike: res.islike
      })
    })
  },

  // 收藏&取消收藏
  collet: function() {
    var that = this;
    var iscollect = this.data.isLike == 0 ? 'yes' : 'no'
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore.collect", {
      iscollect: iscollect,
      merchid: this.data.goodsId,
      type: 1,
    }, function(res) {
      console.log(res);
      that.setData({
        isLike: res.islike,
      })
    })
  },

  // 获取店铺评论
  getcomment: function() {
    var that = this;
    if (this.data.total != '' && this.data.commentList.length >= this.data.total) {
      a.alert("没有更多评论了");
      return;
    }
    a.loading();
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore.get_commentlist", {
      merchid: this.data.shopId,
      page: this.data.page,
    }, function(res) {
      console.log(res);
      for (var i = 0; i < res.list.length; i++) {
        res.list[i].comment_start = parseInt(res.list[i].comment_start)
      }
      that.setData({
        commentList: that.data.commentList.concat(res.list),
        total: res.total,
      })
      a.hideLoading();
    })
  },

  // 查看图文详情
  unfold: function() {
    this.setData({
      isDetail: !this.data.isDetail,
    })
  },

  // 确认团购订单
  confirm: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.groupbuy.confirmorder",{
      id: this.data.goodsId,
      merchid: this.data.shopId
    },function(res){
      console.log(res)
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
    if (this.data.total === "" || this.data.total > this.data.commentList.length) {
      console.log("触底")
      this.setData({
        page: this.data.page += 1
      })
    }
    this.getcomment();
    console.log(this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})