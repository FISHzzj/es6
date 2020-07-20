// pages/my/catBean/catBean.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credit: "0.00",
    page: 1,
    list: [],
    total: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getListData()
  },

  getListData: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.log3", {
      page: this.data.page,
    }, function(res) {
      console.log(res)
      if (res.list.length >= 1) {
        var list = res.list;
        for (var i = 0; i < list.length; i++) {
          switch (list[i].rechargetype) {
            case "signin":
              list[i].recharge = "签到";
              break;
            case "deduction":
              list[i].recharge = "大转盘活动扣除";
              break;
            default:
              list[i].recharge = "系统充值";
              break;
          }
        }
        // list = that.data.list(list)
        console.log(list)
        that.setData({
          list: list,
          total: res.total,
          credit: res.credit2
        })
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
    if(this.list.length<this.total){
      this.setData({
        page: this.data.page + 1
      })
      this.getListData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})