var t = getApp(),
  a = t.requirejs("core"),
  e = t.requirejs("biz/order");
Page({
  data: {
    icons: t.requirejs("icons"),
    status: "all",
    list: [],
    page: 1,
    code: !1,
    cancel: e.cancelArray,
    cancelindex: 0,
    api: "/app/ewei_shopv2_api.php?i=1&r=order.get_orderlist",
    startX: "",
  },
  onLoad: function(a) {
    console.log(a)
    console.log(t.globalData.orderStatus)
    this.setData({
        options: a,
      }),
      t.url(a),
      wx.hideShareMenu()
  },
  get_list: function(api) {
    var t = this;
    t.setData({
        loading: !0
      }),
      a.post(api, {
        page: t.data.page,
        status: t.data.status,
      }, function(res) {
        console.log(res)
        if (0 == res.error) {
          for (var i = 0; i < res.list.length; i++) {
            switch (res.list[i].status) {
              case "1":
                res.list[i].statusstr = "已支付";
                break
              case "0":
                res.list[i].statusstr = "未支付";
                break;
              default:
            }
            switch (res.list[i].merchtype) {
              case "youhui":
                res.list[i].merchtStr = "优惠买单";
                break
              case "groupbuy":
                res.list[i].merchtStr = "团购";
                break;
              case "hotel":
                res.list[i].merchtStr = "酒店预订";
                break;
              case "ordermeal":
                res.list[i].merchtStr = "点餐";
                break;
              default:
                res.list[i].merchtStr = "普通订单";
                break
            }
          }
          t.setData({
            loading: !1,
            show: !0,
            total: res.total,
            empty: !0
          }), res.list.length > 0 && t.setData({
            page: t.data.page + 1,
            list: t.data.list.concat(res.list)
          }), res.list.length < res.pagesize && t.setData({
            loaded: !0
          })
        } else {
          a.toast(res.message, "loading")
        }
      })
  },
  selected: function(t) {
    var e = a.data(t).type;
    if (e == 4) {
      this.setData({
          list: [],
          page: 1,
          status: e,
          empty: !1
        }),
        this.get_list("/app/ewei_shopv2_api.php?i=1&r=order.getreundorders")
    } else {
      this.setData({
          list: [],
          page: 1,
          status: e,
          empty: !1
        }),
        this.get_list(this.data.api)
    }
  },
  // 查看详情
  toDetail: function(e) {
    var i = e.currentTarget.dataset.index;
    // if (this.data.list[i].status == 1) {
    //   wx.navigateTo({
    //     url: '/pages/order/detail/index?id=' + this.data.list[i].id,
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // } else {
    //   wx.showToast({
    //     title: "该订单未支付",
    //     icon: 'none',
    //     duration: 1000,
    //     mask: true,
    //     success: function(res) {},
    //     fail: function(res) {},
    //     complete: function(res) {},
    //   })
    // }
    var list = "list[" + i +"].merchname"
    this.setData({
      [list]: "略略略略略略"
    })
  },
  // 去支付
  toPay: function(e) {
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type;
    if (type == "hotel") {
      a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.hotelorder.hotelpaycheck", {
        orderid: id
      }, function(res) {
        console.log(res)
        if (res.status == 0) {
          a.toast(res.errmsg, "none");
          return;
        }
      })
    }
    wx.navigateTo({
      url: '/pages/pay/pay?orderid=' + id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 评论
  evaluate: function(e) {
    var id = a.data(e).id;
    var index = e.currentTarget.dataset.index;
    if (this.data.list[index].iscomment == "0") {
      a.post("/app/ewei_shopv2_api.php?i=1&r=order.comment", {
        id: id
      }, function(res) {
        console.log(res)
        if (res.status == 1) {
          wx.navigateTo({
            url: '/pages/order/comment/index?orderid=' + id,
            success: function(res) {

            },
            fail: function(res) {},
            complete: function(res) {},
          })
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1500,
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      })
    }
  },
  onReachBottom: function() {
    this.data.loaded || this.data.list.length == this.data.total || this.get_list(this.data.api)
  },
  code: function(t) {
    var e = this,
      s = a.data(t).orderid;
    a.post("verify/qrcode", {
      id: s
    }, function(t) {
      0 == t.error ? e.setData({
        code: !0,
        qrcode: t.url
      }) : a.alert(t.message)
    }, !0)
  },
  close: function() {
    this.setData({
      code: !1
    })
  },
  cancel: function(t) {
    var s = a.data(t).orderid;
    e.cancel(s, t.detail.value, "/pages/order/index?status=" + this.data.status)
    wx.reLaunch({
      url: '/pages/order/index',
    })
  },
  touchS: function(e) {
    this.setData({
      startX: e.changedTouches[0].clientX,
    })
  },
  touchM: function(e) {
    var moveX = (this.data.startX - e.changedTouches[0].clientX) - 100;
    var i = e.currentTarget.dataset.index;
    this.data.list[i].moveX = "right:" + moveX + "rpx"
    if (moveX > -100 && moveX < 0) {
      this.setData({
        list: this.data.list
      })
    }
  },
  touchE: function(e) {
    var endX = this.data.startX - e.changedTouches[0].clientX - 100;
    var i = e.currentTarget.dataset.index;
    if (endX >= -65) {
      this.data.list[i].moveX = "right:0rpx";
      this.setData({
        list: this.data.list
      })
    } else {
      this.data.list[i].moveX = "right:-100rpx";
      this.setData({
        list: this.data.list
      })
    }
    this.setData({
      startX: ""
    })
  },
  // 删除订单
  orderDel: function(e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=order.order_delete", {
      id: id
    }, function(res) {
      console.log(res);
      if (res.error == 0) {
        a.success("删除成功");
        that.setData({
          list: [],
        })
        that.get_list(that.data.api)
      } else {
        a.toast("操作失败", "none")
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      status: t.globalData.orderStatus,
    })
    this.get_list(this.data.api)
  },
  finish: function(t) {
    var s = (a.data(t).type, a.data(t).orderid);
    e.finish(s, "/pages/order/index")
  },
  onShareAppMessage: function() {
    return a.onShareAppMessage()
  },
  
})