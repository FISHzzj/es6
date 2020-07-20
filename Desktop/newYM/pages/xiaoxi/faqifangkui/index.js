var t = getApp(),
  a = t.requirejs("core");
Page({
  data: {
    cate: 0,
    page: 1,
    loading: !1,
    loaded: !1,
    list: []
  },
  onLoad: function () {

  },
  couponinput:function(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  coupontext: function (e) {
    // console.log(e.detail.value)
    this.setData({
      textValue: e.detail.value
    })
  },
  getList: function (id) {
    var t = this;
    if (!t.data.inputValue){
      wx.showToast({
        title: "请输入标题",
        icon: 'success',
        duration: 2000
      })
      return
    }
    if (!t.data.textValue){
      wx.showToast({
        title: "请输入反馈内容",
        icon: 'success',
        duration: 2000
      })
      return
    }

      a.post("/app/ewei_shopv2_api.php?i=1&r=msg.fkadd", {
        title: t.data.inputValue,
        msg: t.data.textValue

      }, function (e) {
        wx.showToast({
          title: e.msg,
          icon: 'success',
          duration: 2000
        })
      })
  },
  onReachBottom: function () {

  },

})