// pages/member/cart/cart.js
var app = getApp(),
  a = app.requirejs("core")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    cartList: [],
    goodsIdList: [],
    totalprice: 0,
    total: 0,
    ischeckall: false,
    isEdit: false,
    merchid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.setData({
      merchid: options.merchid,
    })
    console.log(options)
    this.getCartInfo();
  },

  // 获取购物车信息
  getCartInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.wcart.get_cart", {merchid: this.data.merchid}, function(res) {
      console.log(res);
      var shopList = res.merch_list;
      var checkList = []
      if (shopList!=null) {
        for (var i = 0; i < shopList.length; i++) {
          var goodsList = shopList[i].list;
          var n = 0;
          for (var j = 0; j < goodsList.length; j++) {
            if (goodsList[j].selected == 1) {
              n += 1;
              checkList.push(Number(goodsList[j].id))
            } else {
              // break;
            }
          }
          if (n == goodsList.length) {
            shopList[i].selected = true
          } else {
            shopList[i].selected = false
          }
        }
      } else {

      }
      that.setData({
        cartList: shopList,
        ischeckall: res.ischeckall,
        total: res.total,
        totalprice: res.totalprice,
        goodsIdList: checkList
      })
      console.log(that.data.cartList)
    })
  },

  // 点击多选框
  check: function(e) {
    var type = e.currentTarget.dataset.type;
    var that = this;
    var checked;
    var idArray = [];
    var id = "";
    var merchid = "";
    if (type == 'goods') {
      id = Number(e.currentTarget.dataset.id);
      idArray.push(id);
      checked = e.currentTarget.dataset.checked == 1 ? 0 : 1;

    } else if (type == 'shop') {
      merchid
      checked = e.currentTarget.dataset.checked ? 0 : 1;
      var list = this.data.cartList[e.currentTarget.dataset.index].list;
      for (var i = 0; i < list.length; i++) {
        idArray.push(Number(list[i].id))
      }
    } else {
      checked = this.data.ischeckall ? 0 : 1;
      var list = this.data.cartList;
      for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].list.length; j++) {
          idArray.push(Number(list[i].list[j].id))
        }
      }
      console.log(id)
    }
    this.setData({
      goodsIdList: idArray
    })
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.wcart.select", {
      id: id,
      merchid: merchid ,
      select: checked
    }, function(res) {
      console.log(res);
      that.getCartInfo();
    })
  },

  // 减少数量
  minus: function(e){
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var total = Number(e.currentTarget.dataset.total);
    var min = e.currentTarget.dataset.min == "0" ? 1 : e.currentTarget.dataset.min;
    var that = this;
    if (total <= min) {
      a.alert("不能低于最小购买数");
      return
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.wcart.update",{
      id: id,
      total: total-=1,
    },function(res){
      console.log(res);
      that.getCartInfo();
    })
  },

  // 增加数量
  plus: function(e){
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var total = Number(e.currentTarget.dataset.total);
    var stock = e.currentTarget.dataset.stock;
    var that = this;
    if (stock<=total&&total!=0){
      a.alert("不能超过最大购买数")
      return
    }
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.wcart.update", {
      id: id,
      total: total += 1,
    }, function (res) {
      console.log(res);
      that.getCartInfo();
    })
  },

  // 编辑
  edit: function() {
    this.setData({
      isEdit: true,
    })
  },

  // 删除
  delet: function() {
    var that = this;
    var ids = new Array(this.data.goodsIdList);
    console.log(ids)
    if (this.data.goodsIdList.length != 0) {
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.wcart.remove", {
        ids: this.data.goodsIdList
      }, function(res) {
        console.log(res);
        that.getCartInfo();
      })
    }
  },

  // 完成编辑
  complete: function() {
    this.setData({
      isEdit: false,
    })
  },

  // 去下单
  toCreate: function(){
    var that = this;
    wx.navigateTo({
      url: '/pages/order/create/index?merchid=' + this.data.merchid
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