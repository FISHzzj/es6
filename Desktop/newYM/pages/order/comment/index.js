var t = getApp(),
  a = t.requirejs("core");
Page({
  data: {
    stars_class: ["fui-label-default", "fui-label-primary", "fui-label-success", "fui-label-warning", "fui-label-danger"],
    stars_text: ["差评", "一般", "挺好", "满意", "非常满意"],
    normalSrc: "/static/images/icon/favor.png",
    selectedSrc: "/static/images/icon-red/favor_fill.png",
    key: -1,
    content: "",
    images: [],
    imgs: [],
    show: true,
    orderid: '',
  },
  onLoad: function(options) {
    console.log(options)
    this.setData({
      orderid: options.orderid,
    }) 
    // this.get_list()
  },
  select: function(t) {
    var a = t.currentTarget.dataset.key;
    this.setData({
      key: a
    })
  },
  change: function(t) {
    var e = a.data(t).name,
      i = {};
    i[e] = t.detail.value, this.setData(i)
  },
  submit: function() {
    if ("" == this.data.content || -1 == this.data.key) return a.alert("有未填写项目!"), !1;
    // for (var e = 0, i = this.data.goods.length; e < i; e++) {
    //   var s = {
    //     orderid: 637,
    //     level: this.data.key + 1,
    //     content: this.data.content,
    //     images: this.data.images
    //   };
    // }
    t = {
      orderid: this.data.orderid,
      level: this.data.key + 1,
      content: this.data.content,
      images: this.data.images
    };
    console.log(t)
    a.post("/app/ewei_shopv2_api.php?i=1&r=order.commentsubmit", t, function(t) {
      console.log(t)
      if(t.status==1){
        a.success(t.message);
        wx.navigateBack();
      }else{
        a.alert(t.message)
      }
    }, !0)
  },
  upload: function(t) {
    var e = this,
      i = a.data(t),
      s = i.type,
      n = e.data.images,
      o = e.data.imgs,
      r = i.index;
    console.log(t)
    "image" == s ? a.upload(function(t) {
      console.log(t)
      n.push(t.tomedia_img);
      console.log(n)
      o.push(t.tomedia_img), e.setData({
        images: n,
        imgs: o
      })
    }) : "image-remove" == s ? (n.splice(r, 1), o.splice(r, 1), e.setData({
      images: n,
      imgs: o
    })) : "image-preview" == s && wx.previewImage({
      current: o[r],
      urls: o
    })
  }
})