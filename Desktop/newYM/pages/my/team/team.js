// pages/my/team/team.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    list: [],
    info: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    this.getListData();
  },

  // 获取团队数据
  getListData: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.myteam",{
      type: this.data.type
    },function(res){
      // console.log(res);
      if(res.list.length>1){
        for(var i = 0;i<res.list.length;i++){
          res.list[i].time = that.timestampToDate(res.list[i].createtime);
        }
        that.setData({
          list: res.list,
          info: res,
        })
      }
      a.hideLoading()
    })
  },

  // 切换
  tab: function(e){
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type,
    })
    a.loading();
    this.getListData();
  },

  timestampToDate: function (unixtimestamp){
    var unixtimestamp = new Date(unixtimestamp * 1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
      + " " + hour.substring(hour.length - 2, hour.length) + ":"
      + minute.substring(minute.length - 2, minute.length);
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