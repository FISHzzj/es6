// pages/my/collect/collect.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 1,
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()
  },

  tab: function(e){
    var type = e.currentTarget.dataset.type;
    this.setData({
      type: type
    })
    this.getListData();
  },

  getListData: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.mycollect",{type:this.data.type},function(res){
      console.log(res);
      var list = res.mycollect;
      if(that.data.type==0){
        for (var i = 0; i < list.length;i++){
          var num = Math.ceil(list[i].start)
          list[i].startNum = []
          for(var n = 0;n<num;n++){
            var item = {};
            list[i].startNum.push(item);
          }
        }
      }
      console.log(list)
      that.setData({
        list: list
      })
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