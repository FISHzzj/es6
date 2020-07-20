// pages/list/list.js
var app = getApp(),a = app.requirejs("core");
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    tabType: '',
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getListData()
  },

  // tab切换
  tab: function(e){
    var type = e.currentTarget.dataset.type;
    this.setData({
      tabType: type,
    })
    this.getListData()
  },

  // 获取列表数据
  getListData: function (){
    var that = this;
    a.loading()
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.groupbuy", { status: this.data.tabType},function(res){
      that.setData({
        list: res.list
      })
      a.hideLoading();
    })
  },

  // 删除项目
  delet: function(e){
    var id = e.currentTarget.dataset.id;
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.groupbuy.deletegoubuy",{id: id},function(res){
      console.log(res);
      if (res.status==1){
        a.alert("删除成功");
        that.getListData();
      }else{
        a.alert("删除失败，请重试")
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})