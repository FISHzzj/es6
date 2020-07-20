// pages/Sett_zhuti/Sett_zhuti.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
      xuanz:["个体","企业"],
      index: '',
      end:"请选择主体类型",
      miantype:"",
    items: [
      { name: 'qye', value: '企业支付宝' },
      { name: 'gre', value: '个人支付宝' },
    ],
    radioStr: ''
  },
  // 单选结算方式---------------------------
  radioChange: function (e) {
    var str = null;
    for (var value of this.data.items) {
      if (value.name === e.detail.value) {
        str = value.value;
        break;
      }
    }
    this.setData({ radioStr: str });
    console.log(this.data.radioStr)
  },
  // 主体类型的选择的事件-----------------------------------
  bindPickerChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index:e.detail.value,
      end:""
    })
    if (this.data.index==0){
      this.setData({
        miantype:"个体"
      })
    }else{
      this.setData({
        miantype: "企业"
      })
    }
    // console.log(this.data.miantype)
  },
  // 下一步的事件-----------------------------------------------
  submit: function (e) {
    var zhuti = e.detail.value;
    console.log(zhuti)
    if (this.data.end == "请选择主体类型" ) {
      console.log("请选择主体类型")
      wx.showModal({
        title: '提示',
        content: '请选择主体类型',

      })
      return
    }
    if (e.detail.value.unitname == "") {
      console.log("请输入个体名称")
      wx.showModal({
        title: '提示',
        content: '请输入个体名称',

      })
      return
    }
    if (e.detail.value.socialcode == "") {
      console.log("请输入统一社会信用代码")
      wx.showModal({
        title: '提示',
        content: '请输入统一社会信用代码',

      })
      return
    }
    if (e.detail.value.socialcode == "") {
      console.log("请输入统一社会信用代码")
      wx.showModal({
        title: '提示',
        content: '请输入统一社会信用代码',

      })
      return
    }
    if (e.detail.value.operator == "") {
      console.log("请输入营业者")
      wx.showModal({
        title: '提示',
        content: '请输入营业者',

      })
      return
    }
    if (this.data.radioStr == "") {
      console.log("请选择结算方式")
      wx.showModal({
        title: '提示',
        content: '请选择结算方式',

      })
      return
    }
    if (e.detail.value.alipayname == "") {
      console.log("请输入支付宝注册人")
      wx.showModal({
        title: '提示',
        content: '请输入支付宝注册人',

      })
      return
    }
    if (e.detail.value.alipaynum == "") {
      console.log("请输入支付宝账号")
      wx.showModal({
        title: '提示',
        content: '请输入支付宝账号',

      })
      return
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.set_maininfo",{
      miantype: this.data.miantype,
      unitname: zhuti.unitname,
      socialcode: zhuti.socialcode,
      operator: zhuti.operator,
      alipaytype:this.data.radioStr,
      alipayname: zhuti.alipayname,
      alipaynum: zhuti.alipaynum,
    }, function (res) {
      console.log(res.message)
      if (res.message == "更新成功!") {
        wx.redirectTo({
          url: "/pages/merchant/enter/Sett_mengdian/Sett_mengdian?type=1",
        })
      } else {
        console.log("更新失败")
      }
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