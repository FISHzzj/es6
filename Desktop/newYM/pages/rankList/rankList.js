// pages/rankList/rankList.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabType: "",
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    a.loading();
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.rankinglist.getexpenditurelist",{},function(res){
      console.log(res)
      that.setData({
        list: res.list
      })
      a.hideLoading()
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

  clickTab: function(e){
    var type = e.currentTarget.dataset.tab;
    var that = this;
    console.log(e)
    this.setData({
      tabType: type,
    })
    if(type == ""){
      // 消费榜单
      a.loading();
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.rankinglist.getexpenditurelist", {}, function (res) {
        console.log(res)
        that.setData({
          list: res.list
        })
        a.hideLoading()
      })
    }else if(type == "vip"){
      // 分享会员榜单
      a.loading();
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.rankinglist.getsharesemberlist", {}, function (res) {
        console.log(res)
        that.setData({
          list: res.list
        })
        a.hideLoading()
      })
    }else{
      // 分享店铺榜单
      a.loading();
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.rankinglist.getsharestorelist", {}, function (res) {
        console.log(res)
        that.setData({
          list: res.list
        })
        a.hideLoading()
      })
    }
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