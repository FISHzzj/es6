// pages/Sett_xianmu/Sett_xianmu.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    begin: '',
    stati:'',
    names:'',
    zhidin:'',
    jine:'',
    hongbao:'',
    checs:"否",
  },

  // 选择开始时间
  sTimeChange: function (e) {
    this.setData({
      begin: e.detail.value,
    })
  },
  lacgo(event){
   
    
  },

  submit:function(e){
    var xianmu = e.detail.value;
    console.log(xianmu)
    if(e.detail.value.title==""){
      console.log("请输入项目名")
      wx.showModal({
        title: '提示',
        content: '请输入项目名',
        
      })
      return
    }
    if (e.detail.value.starttime == "") {
      console.log("请开始选择时间")
      wx.showModal({
        title: '提示',
        content: '请开始选择时间',
      })
      return
    }
    if (e.detail.value.dtarttime == "") {
      console.log("请开始结束时间")
      wx.showModal({
        title: '提示',
        content: '请开始结束时间',
      })
      return
    }
    if (e.detail.value.zhidin == "") {
      console.log("请填写指定金额")
      wx.showModal({
        title: '提示',
        content: '请填写指定金额',
      })
      return
    }
    if (e.detail.value.jine == "") {
      console.log("请填写免减金额")
      wx.showModal({
        title: '提示',
        content: '请填写免减金额',
      })
      return
    }
    
    if (e.detail.value.hongbao == "") {
      console.log("请填写红包百分率")
      wx.showModal({
        title: '提示',
        content: '请填写红包百分率',
      })
      return  
    } 
   
      if (e.detail.value.chec == false) {
        this.setData({
          checs: "否"
        })
         
      } else {
        this.setData({
          checs: "是"
        })
      }
    console.log(this.data.checs)
    
      var xianmu = e.detail.value;
      console.log(xianmu)
      a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.set_youhuiinfo",{
        name:xianmu.title,
        start: xianmu.starttime,
        end	:xianmu.dtarttime,
        money1:xianmu.zhidin,
        money2:xianmu.jine,
        money3: xianmu.hongbao,
        discount:this.data.checs
      },function(res){
        console.log(res.message)
        if (res.message=="更新失败!") {
          console.log("更新失败")
        }else{
          wx.redirectTo({
            url: "/pages/merchant/enter/Sett_shouquan/Sett_shouquan",
          })
        }
      })
    
    
  },

  // 选择结算时间
  dTimeChange: function (e) {
    this.setData({
      stati: e.detail.value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()

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