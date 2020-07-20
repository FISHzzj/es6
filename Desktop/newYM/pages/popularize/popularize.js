// pages/popularize/popularize.js
var app = getApp(),a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataType: "xiaji",
    sum_turnover: 0,
    sum_salesvolume: 0,
    list: [{}],
    id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getListData();
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

  getListData(id){
    var that = this;
    if(this.data.dataType=="xiaji"){
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.team.getpromoter", {}, function (res) {
        console.log(res)
        that.setData({
          list: res.list,
          sum_turnover: res.sum_turnover,
          sum_salesvolume: res.sum_salesvolume,
        })
      })
    }else if(this.data.dataType=="shangjia"){
      if(id){
        
      }else{
        id = this.data.id;
      }
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.team.getbusiness", {id: id}, function (res) {
        console.log(res)
        that.setData({
          list: res.list,
          sum_turnover: res.sum_turnover,
          sum_salesvolume: res.sum_salesvolume,
        })
      })
    }else{
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.team.getpromotionmember", {}, function (res) {
        console.log(res)
        that.setData({
          list: res.list,
          sum_turnover: res.sum_turnover,
          sum_salesvolume: res.sum_salesvolume,
        })
      })
    }
  },

  tab:function(e){
    var that = this;
    var type = e.currentTarget.dataset.tab;
    that.setData({
      dataType: type,
    })
    this.getListData()
  },

  check: function(e){
    var i = e.currentTarget.dataset.index;
    var id = this.data.list[i].id;
    this.setData({
      dataType: "shangjia"
    })
    this.getListData(id);
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