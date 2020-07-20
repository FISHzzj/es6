var t = getApp(),
  a = t.requirejs("core");
Page({
  data: {
    cate: 0,
    page: 1,
    loading: !1,
    loaded: !1,
    list: [],
    approot: t.globalData.approot,
    QRshow: false,
    QRurl: "",
  },
  onLoad: function(t) {
    this.getList()
  },
  myTab: function(t) {
    console.log(t)
    var e = this,
      i = a.pdata(t).cate;
    console.log(i)
    e.setData({
        cate: i,
        page: 1,
        list: []
      }),
      e.getList()
  },
  getList: function() {
    var t = this;
    a.loading(), this.setData({
        loading: !0
      }),
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.myticket", {
        page: this.data.page,
        status: this.data.cate
      }, function(e) {
        console.log(e);
        if (e.data) {
          e.data.forEach(function(o) {
            console.log(o)
            if (o.couponname == '收银优惠卷') {
              o.sic = '0';
              o.imgc = 'blue'
            } else if (o.couponname == '购物优惠卷') {
              o.sic = '_j2';
              o.imgc = 'blue1'
            } else if (o.couponname == '充值优惠卷') {
              o.sic = '_c';
              o.imgc = 'red'
            }
          })
        }
        var i = {
          loading: !1,
          total: e.total,
          pagesize: e.pagesize,
          closecenter: e.closecenter
        };
        // e.data.length > 0 && (i.page = t.data.page + 1, i.list = t.data.list.concat(e.list),
        //   e.data.length < e.pagesize && (i.loaded = !0)), t.setData(i), a.hideLoading()
        t.setData({
          list: e.data
        })
        t.data.list.concat(e.list)
        a.hideLoading()
      })
  },
  onReachBottom: function() {

  },
  viewQR: function(e) {
    var i = e.currentTarget.dataset.index;
    console.log(i);
    if (this.data.cate == 0) {
      this.setData({
        QRurl: this.data.list[i].qr_img_add,
        QRshow: true,
      })
    }
  },
  close: function() {
    this.setData({
      QRshow: false,
      QRurl: "",
    })
  }
})