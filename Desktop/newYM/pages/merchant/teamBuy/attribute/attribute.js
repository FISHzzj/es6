// pages/attribute/attribute.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: '',
    begin: '',
    end: '',
    sTime: '',
    form: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    if (options.id) {
      this.setData({
        pid: options.id,
      })
      this.getInfo();
    } else {
      this.setData({
        form: app.globalData.projectInfo,
        begin: this.timestampTransform(new Date()),
        end: "-选择结束时间-",
        sTime: this.timestampTransform(new Date()),
      })
    }
  },

  // 获取项目信息
  getInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.groupbuy.getmain_info", {
      id: this.data.pid
    }, function(res) {
      console.log(res);
      that.setData({
        form: res,
        begin: res.starttime,
        sTime: res.starttime,
        end: res.endtime,
      })
      Object.assign(app.globalData.projectInfo, res)
    })
  },

  // 时间戳转YYYY-MM-DD
  timestampTransform: function(unixtimestamp) {
    var year = unixtimestamp.getFullYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
  },

  // 选择开始时间
  sTimeChange: function(e) {
    this.setData({
      sTime: e.detail.value,
      begin: e.detail.value,
      end: "-选择结束时间-"
    })
  },

  // 选择结束时间
  eTimeChange: function(e) {
    this.setData({
      end: e.detail.value
    })
  },

  // 下一步
  formSubmit: function(e) {
    console.log(e);
    var that = this;
    var type = e.detail.target.dataset.type;
    var formData = e.detail.value;
    var reg = /^\d+(\.\d{0,2})?$/;
    if (formData.endtime == "" || formData.endtime == "-选择结束时间-") {
      a.alert("请选择结束时间");
      return;
    } else if (!reg.test(formData.storeprice) || Number(formData.storeprice) == 0) {
      a.alert("请正确填写门店价格")
      return;
    } else if (!reg.test(formData.itemprice) || Number(formData.itemprice) == 0) {
      a.alert("请正确填写项目价格")
      return;
    } else {

    }
    formData.checked = formData.checked ? "1" : "0"
    formData.status = formData.status ? "1" : "0"
    formData.anytimerefund = formData.anytimerefund ? "1" : "0"
    formData.overduerefund = formData.overduerefund ? "1" : "0"
    formData.isfreeappointment = formData.isfreeappointment ? "1" : "0"
    Object.assign(app.globalData.projectInfo, formData);
    var data = app.globalData.projectInfo;
    delete data.error;
    delete data.merchid;
    console.log(data)
    if (type == "complete") {
      a.loading();
      a.post("/app/ewei_shopv2_api.php?i=1&r=merch.groupbuy.editmain_info", {
        data
      }, function(res) {
        console.log(res);
        a.hideLoading();
        if (res.status == 1) {
          a.success(res.message);
          wx.redirectTo({
            url: '/pages/merchant/teamBuy/list/list',
          })
        } else {
          a.alert(res.message)
        }
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/merchant/teamBuy/purchase/purchase',
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})