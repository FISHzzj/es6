var t = getApp(),
  e = t.requirejs("core"),
  i = t.requirejs("biz/order");
Page({
  data: {
    code: !1,
    consume: !1,
    store: !1,
    cancel: i.cancelArray,
    cancelindex: 0,
    diyshow: {},
    show: false,
    info: {},
    ordertime: ""
  },
  onLoad: function(e) {
    console.log(e)
    e.id = parseInt(e.id)
    console.log(e)
    this.setData({
      show: true,
      options: e
    })
    // ,t.url(e)
  },
  onShow: function() {
    this.get_list()
  },
  get_list: function() {
    var t = this;
    e.post("/app/ewei_shopv2_api.php?i=1&r=order.getdetail", {
      id: this.data.options.id
    }, function(i) {
      console.log(i)
      if (i.error == 0) {
        t.setData({
          ordertime: i.ordertime,
          info: i.orderdetail,
          show: false
        })
      } else {
        5e4 != i.error && e.toast(i.message, "loading"), wx.redirectTo({
          url: "/pages/order/index"
        })
      }
    })
  },
  code: function(t) {
    var i = this,
      a = e.data(t).orderid;
    e.post("verify/qrcode", {
      id: a
    }, function(t) {
      0 == t.error ? i.setData({
        code: !0,
        qrcode: t.url
      }) : e.alert(t.message)
    }, !0)
  },
  diyshow: function(t) {
    var i = this.data.diyshow,
      a = e.data(t).id;
    i[a] = !i[a],
      this.setData({
        diyshow: i
      })
  },
  close: function() {
    this.setData({
      code: !1
    })
  },
  toggle: function(t) {
    var i = e.pdata(t),
      a = i.id,
      o = i.type,
      n = {};
    n[o] = 0 == a || void 0 === a ? 1 : 0,
      this.setData(n)
  },
  phone: function(t) {
    e.phone(t)
  },
  cancel: function(t) {
    i.cancel(this.data.options.id, t.detail.value, "/pages/order/detail/index?id=" + this.data.options.id)
  },
  delete: function(t) {
    var a = e.data(t).type;
    i.delete(this.data.options.id, a, "/pages/order/index")
  },
  finish: function(t) {
    i.finish(this.data.options.id, "/pages/order/index")
  },
  refundcancel: function(t) {
    var e = this;
    i.refundcancel(this.data.options.id, function() {
      e.get_list()
    })
  },
  onShareAppMessage: function() {
    return e.onShareAppMessage()
  }
})