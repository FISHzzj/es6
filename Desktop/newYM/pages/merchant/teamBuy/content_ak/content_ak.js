// pages/content_ak/content_ak.js
var app= getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    goodsList: [],
    dataList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getList()
  },

  // 获取列表
  getList: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.groupbuy.getgoodslist",{id: this.data.id},function(res){
      console.log(res)
      that.setData({
        goodsList: res.goodslisty,
      })
      console.log(that.data.goodsList)
    })
  },

  // 输入数量
  num: function(e){
    var index = e.currentTarget.dataset.index;
    var num = e.detail.value;
    var id = e.currentTarget.dataset.id;
    this.data.goodsList[index].num = num;
    this.data.dataList[id] = num;
    this.setData({
      goodsList: this.data.goodsList,
      dataList: this.data.dataList,
    })
  },

  // 选中商品
  checkboxChange: function(e){
    var value = e.detail.value;
    var data = {};
    var that = this;
    for(var i = 0;i<value.length;i++){
      var n = Number(value[i]);
      data[that.data.goodsList[n].id] = that.data.goodsList[n].num;
    }
    this.setData({
      dataList: data,
    })
  },

  // 下一步
  next: function(){
    app.globalData.projectInfo.setmeal = this.data.dataList;
    wx.navigateTo({
      url: '/pages/merchant/teamBuy/sketch/sketch',
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