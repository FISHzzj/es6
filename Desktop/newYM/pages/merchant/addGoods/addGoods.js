// pages/addGoods/addGoods.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: "1",
    images: [],
    imgs: [],
    imgurl: [],
    classify: [],
    index: 0,
    failIcon: "/static/images/icon/errorIcon.png"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getClassify();
  },

  // 获取商品分类
  getClassify: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.merchgoods.getcategory", {}, function(res) {
      console.log(res);
      that.setData({
        classify: res.category
      })
    })
  },

  // tab切换
  tab: function(e) {
    var type = e.currentTarget.dataset.type;
    this.setData({
      tab: type,
      images: [],
      imgs: [],
      imgurl: [],
    })
  },

  // 上传图片
  upload: function(t) {
    var e = this,
      i = a.data(t),
      s = i.type,
      n = e.data.images,
      o = e.data.imgs,
      l = e.data.imgurl,
      r = i.index;
    "image" == s ? a.upload(function(t) {
      console.log(t)
      n.push(t.tomedia_img);
      l.push(t.filename);
      console.log(l)
      o.push(t.tomedia_img);
      e.setData({
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
  },

  // 删除图片
  del: function(e){
    var index = e.currentTarget.dataset.index
    this.data.images.splice(index, 1);
    this.data.imgurl.splice(index, 1);
    this.setData({
      images: this.data.images,
      imgurl: this.data.imgurl,
    })
  },

  // 选择器事件
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
  },

  // 提交餐品商品
  mealSubmit: function(e) {
    var form = e.detail.value;
    var failIcon = this.data.failIcon;
    var reg = /^\d+(\.\d{0,2})?$|^\.\d{1,2}$/;
    var that = this;
    console.log(form)
    if (form.title == "") {
      a.toast("请填写商品名称", "none", failIcon);
      return;
    } else if (form.unit == "") {
      a.toast("请填写商品单位", "none", failIcon);
      return;
    } else if (form.total == "") {
      a.toast("请填写商品数量", "none", failIcon);
      return;
    } else if (form.marketprice == "" || !(reg.test(form.marketprice))) {
      a.toast("请正确填写价格", "none", failIcon);
      return;
    } else if (form.description == "") {
      a.toast("请填写商品详情", "none", failIcon);
      return;
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.merchgoods.setgoods", {
      title: form.title,
      unit: form.unit,
      total: form.total,
      marketprice: form.marketprice,
      originalprice: form.originalprice,
      costprice: form.costprice,
      images: this.data.imgurl,
      description: form.description,
      merch_goods_cat: form.merch_goods_cat,
      classes: 1,
    }, function(res) {
      console.log(res)
      a.toast(res.message, "none");
      if (res.status == 1) {
        wx.redirectTo({
          url: '/pages/merchant/index',
        })
      }
    })
  },

  // 提交酒店商品
  hotelSubmit: function(e) {
    var form = e.detail.value;
    var that = this;
    var reg = /^\d+(\.\d{0,2})?$|^\.\d{1,2}$/;
    var failIcon = this.data.failIcon;
    console.log(form);
    if (form.title == "") {
      a.toast("请填写商品名称", "none", failIcon);
      return;
    } else if (form.unit == "") {
      a.toast("请填写商品单位", "none", failIcon);
      return;
    } else if (form.total == "") {
      a.toast("请填写商品数量", "none", failIcon);
      return;
    } else if (form.marketprice == "" || !(reg.test(form.marketprice))) {
      a.toast("请正确填写价格", "none", failIcon);
      return;
    } else if (form.description == "") {
      a.toast("请填写商品详情", "none", failIcon);
      return;
    } else if (form.housetype == "") {
      a.toast("请填写酒店床型", "none", failIcon);
      return;
    } else if (form.internet == "") {
      a.toast("请填写上网方式", "none", failIcon);
      return;
    } else if (form.live_num == "") {
      a.toast("请填写可住人数", "none", failIcon);
      return;
    } else if (form.area == "") {
      a.toast("请填写面积", "none", failIcon);
      return;
    } else if (form.breakfast == "") {
      a.toast("请填写早餐", "none", failIcon);
      return;
    } else if (form.window == "") {
      a.toast("请填写窗户", "none", failIcon);
      return;
    } else if (form.window == "") {
      a.toast("请填写卫浴", "none", failIcon);
      return;
    } else if (form.hotel_condition.length == 0) {
      a.toast("至少一个筛选条件", "none", failIcon);
      return;
    } else if (form.live_rule == "") {
      a.toast("请填写入住规则", "none", failIcon);
      return;
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.merchgoods.setgoods", {
      title: form.title,
      unit: form.unit,
      total: form.total,
      marketprice: form.marketprice,
      originalprice: form.originalprice,
      costprice: form.costprice,
      images: this.data.imgurl,
      description: form.description,
      merch_goods_cat: form.merch_goods_cat,
      classes: 2,
      housetype: form.housetype,
      breakfast: form.breakfast,
      internet: form.internet,
      window: form.window,
      live_num: form.live_num,
      bathroom: form.bathroom,
      area: form.area,
      hotel_condition: form.hotel_condition.join(","),
      live_rule: form.live_rule,
    }, function(res) {
      console.log(res)
      a.toast(res.message, "none");
      if (res.status == 1) {
        wx.redirectTo({
          url: '/pages/merchant/index',
        })
      }
    })
  },

  // 其他商品提交
  orderSubmit: function(e) {
    var form = e.detail.value;
    var that = this;
    var reg = /^\d+(\.\d{0,2})?$|^\.\d{1,2}$/;
    var failIcon = this.data.failIcon;
    console.log(form);
    if (form.title == "") {
      a.toast("请填写商品名称", "none", failIcon);
      return;
    } else if (form.unit == "") {
      a.toast("请填写商品单位", "none", failIcon);
      return;
    } else if (form.total == "") {
      a.toast("请填写商品数量", "none", failIcon);
      return;
    } else if (form.marketprice == "" || !(reg.test(form.marketprice))) {
      a.toast("请正确填写价格", "none", failIcon);
      return;
    } else if (form.description == "") {
      a.toast("请填写商品详情", "none", failIcon);
      return;
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.merchgoods.setgoods", {
      title: form.title,
      unit: form.unit,
      total: form.total,
      marketprice: form.marketprice,
      originalprice: form.originalprice,
      costprice: form.costprice,
      images: this.data.imgurl,
      description: form.description,
      classes: 0,
    }, function(res) {
      console.log(res)
      a.toast(res.message, "none");
      if (res.status == 1) {
        wx.redirectTo({
          url: '/pages/merchant/index',
        })
      }
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