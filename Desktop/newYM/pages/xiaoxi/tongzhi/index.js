var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("wxParse/wxParse");
Page({
  data: {
    cate: 0,
    page: 1,
    loading: !1,
    loaded: !1
    // list: []
  },
  tongzhi:function(e){
    console.log(e);
    var tgid =  e.currentTarget.dataset.tgid;
    wx.navigateTo({
      url: '/pages/xiaoxi/tuangou/index?tgid=' + tgid,
    })
  },
  onLoad: function (options) {
    var id = options.id;
    this.getList(id)
  },
  getList: function (id) {
    var t = this;
    a.loading(), this.setData({
      loading: !0
    }),
    a.post("/app/ewei_shopv2_api.php?i=1&r=msg.details1", {
      id:id
    }, function (c) {
      console.log(c);
      if(c.error == 0){
        var list = c.list;
        t.setData({
          chargetype: list.chargetype,
          msg: list.msg,
          time: list.time,
          title: list.title,
          tgid: list.tgid
        })
        var msg = list.msg;
        e.wxParse('article', 'html', msg, t, 5);
      }
      a.hideLoading()
    })
  },
  onReachBottom: function () {

  },
})