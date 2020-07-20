// pages/zhifuye/zhifuye.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: '',
    orderInfo: {},
    hotelInfo: {},
    merchInfo: {},
    ishotel: '',
    isbutton: false, 
    goodsList: [],
    credit2: '',
    credit3: '',
    isdeduction: 0,
    isRedpacket: false,
    isCatbean: false,
    sumNum: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderid: options.orderid,
    })
    this.getOrderInfo();
    this.getgoodsList();
  },

  back: function(){
    wx.navigateBack({
      
    })
  },

  // 获取订单基本信息
  getOrderInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=order.orderpay", {
      orderid: this.data.orderid
    }, function(res) {
      console.log(res)
      if (res.error == 0) {
        switch (res.order_info.merchtype) {
          case "youhui":
            res.order_info.merchtype = "优惠买单"
            break;
          case "groupbuy":
            res.order_info.merchtype = "团购订单";
            break;
          case "ordermeal":
            res.order_info.merchtype = "点餐";
            break;
          default:
            res.order_info.merchtype = "酒店订单";
            break;
        }
        that.setData({
          credits: res.credits,
          credit2: res.credits.credit2,
          credit3: res.credits.credit3,
          // credit3: "3.5",
          sumNum: Number(res.order_info.realmoney),
          sum: res.order_info.realmoney,
          merchInfo: res.merch_info,
          orderInfo: res.order_info,
          hotelInfo: res.hotel_info,
          ishotel: res.ishotel == 0 ? false : true,
        })
      } else {
        a.toast("获取订单信息失败", "none")
      }
    })
  },

  // 获取订单商品信息
  getgoodsList: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=order.orderpay.getOrdergoodslist", {
      orderid: this.data.orderid
    }, function(res) {
      // console.log(res);
      if (res.status == 1) {
        that.setData({
          goodsList: res.result.list,
        })
      }
    })
  },

  // 是否抵扣
  switchChange(e) {
    var that = this,
      credit2,
      key,
      type = e.currentTarget.dataset.type,
      sum = Number(this.data.sum),
      sumNum = this.data.sumNum;
    if (type == "redpacket") {
      credit2 = Number(this.data.credits.credit2);
      key = "credit2"
      this.setData({
        isRedpacket: !this.data.isRedpacket,
      })
    } else {
      credit2 = Number(this.data.credits.credit3);
      // credit2 = 3.5
      key = "credit3"
      this.setData({
        isCatbean: !this.data.isCatbean,
      })
    }

    if (e.detail.value) {
      this.setData({
        [key]: credit2 > sum ? (credit2 - sum).toFixed(2) : 0.00,
        sum: credit2 < sum ? (sum - credit2).toFixed(2) : 0.00,
        sumNum: (sum - credit2).toFixed(2),
        isdeduction: 1,
      })
      setTimeout(()=>{
        console.log(this.data.sumNum, (sum - credit2).toFixed(2))
      },500)
    } else {
      this.setData({
        [key]: credit2,
        sum: (Number(sumNum) + credit2).toFixed(2),
        sumNum: (Number(sumNum) + credit2).toFixed(2),
        isdeduction: 0
      })
    }
  },

  // 支付
  pay: function() {
    var that = this;
    this.setData({
      isbutton: true,
    })
    a.post("/app/ewei_shopv2_api.php?i=1&r=order.orderpay.topay", {
      orderid: this.data.orderid,
      paytype: 'wechat',
      isdeduction: this.data.isdeduction,
    }, function(res) {
      console.log(res);
      if (res.error != 0) {
        a.alert("支付验证失败，请重试！")
        return;
      }
      if (res.fulldeduction == 1) {
        a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.youhuipay.deduction_credit2pay", {
          orderid: that.data.orderid
        }, function(res) {
          console.log(res);
          if (res.error == 0) {
            a.success(res.message);
            wx.switchTab({
              url: '/pages/order/index',
            })
          } else {
            that.setData({
              isbutton: false,
            })
          }
        })
      } else {
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: 'MD5',
          paySign: res.paySign,
          success(res) {
            console.log(res);
            wx.switchTab({
              url: '/pages/order/index',
            })
          },
          fail(res) {
            a.alert("支付失败");
            that.getOrderInfo();
            that.getgoodsList();
            that.setData({
              isbutton: false,
            })
          }
        })
      }
      if (false) {

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