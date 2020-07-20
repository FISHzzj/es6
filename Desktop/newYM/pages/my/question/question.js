// pages/my/question/question.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    popup: false,
    questionId: '',
    list: [{}],
    answer: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData();
  },

  getListData: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.question",{},function(res){
      console.log(res);
      if(res.list.length>1){
        that.setData({
          list: res.list,
        })
      }
    })
  },

  check: function(e){
    a.loading()
    var that = this;
    var id = e.currentTarget.dataset.id;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.question.answer",{id:id},function(res){
      console.log(res);
      if(res.info){
        that.setData({
          answer: res.info.answer,
          popup:true
        })
        a.hideLoading();
      }else{
        a.hideLoading();
        a.alert("网络连接错误，请稍后再试")
      }
    })
  },

  close: function(){
    this.setData({
      popup: false,
      questionId: '',
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