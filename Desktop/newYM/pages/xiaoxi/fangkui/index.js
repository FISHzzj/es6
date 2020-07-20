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
  onLoad: function (options) {
    var id = options.id;
    console.log(id);
    this.getList(id)
  },
  getList: function (id) {
    var t = this;
    a.loading(), this.setData({
      loading: !0
    }),
    a.post("/app/ewei_shopv2_api.php?i=1&r=msg.details2", {
      id:id
    }, function (e) {
      // console.log(e);
      if(e.error==0){
        var hd =[],tw = [];
        hd.push(e.hd);
        tw.push(e.tw);
        t.setData({
          hd: hd,
          tw: tw
        })
      }
      console.log(t.data.hd);
      console.log(t.data.tw);
      a.hideLoading() 
    })
  },
  onReachBottom: function () {

  },

})