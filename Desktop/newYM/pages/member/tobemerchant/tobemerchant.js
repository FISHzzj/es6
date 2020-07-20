// pages/member/tobemerchant/tobemerchant.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPay: true,
    isShow: false,
    richData: "",
    protocolTitle: "",
    tgsXY: "本合同是由推广商（甲方）与广州野猫网络科技有限公司（以下简称乙方）就购买推广商套餐相关事项所订立的有效合约。您作为推广商，通过网络页面点击确认或以其他双方认可的方式选择接受本合同，即表示甲方与乙方已达成本合同并同意接受本合同的全部约定内容。<br>双方在线签署本合同或其他线上合同或协议后，甲方因个人等原因需要纸质合同进行确认或存档的，双方可再行签订纸质合同，但不能因此视为双方存在两个合同关系，纸质合同的内容必须与在线签署的合同内容一致，在线签署的合同内容与纸质合同的约定不一致的，以前者的约定为准。<br>甲、乙双方本着平等、互利、真诚合作的原则，经协商，达成如下协议：<br>1、甲方自愿购买一仟九佰元整（1900元整）套餐，成为推广商，同时拥有20张授权码高级权限。<br>2、甲方购买套餐后，乙方同意甲方成为野猫网推广商合作伙伴。乙方承认甲方推广商资质，签约一年高级合作伙伴。考核要求：在协议期内，一年内必须推广20个有效商家，否则乙方有权取消甲方推广商资格或次年不参加推广商资格，并无需承担任何赔偿责任。前729名可参加野猫网年度净利润5%分红权。<br>3、乙方必须做好对甲方的沟通工作，若政策的改变及时通知甲方。乙方如因变化发展需要调整，则乙方有义务提前15天通知甲方。<br>4、甲方成为推广商，享有推荐推广商权，分润权，但不包括拥有并分配股权、投票权在内等董事会权利。<br>5、甲方有义务对乙方平台模式、机制、政策等保密并严格遵守。否则乙方有权取消甲方推广商资格，并无需承担任何赔偿责任。<br>6、协约期限从签订即日起一年期满，合约期满后，若双方对合作无异议，根据市场价格续费后此合同自动顺延。<br>7、甲方通过输入支付宝/微信账户密码确认支付的方式来确认本合同,与乙方加盖公章的行为具有相同的法律效力。<br>8、本合同的效力、解释、变更、执行及争议的解决等均适用中华人民共和国法律。因本合同产生的任何争议，双方应协商解决，协商不成的，应提交被告住所地有管辖权的人民法院裁决。<br>9、本合同一式两份，双方各执一份，具有同等法律效力。",
    wqXY: "本合同是由微区域合伙人（甲方）与广州野猫网络科技有限公司（以下简称乙方）就购买微区域合伙人套餐相关事项所订立的有效合约。您作为微区域合伙人，通过网络页面点击确认或以其他双方认可的方式选择接受本合同，即表示甲方与乙方已达成本合同并同意接受本合同的全部约定内容。<br>	双方在线签署本合同或其他线上合同或协议后，甲方因个人等原因需要纸质合同进行确认或存档的，双方可再行签订纸质合同，但不能因此视为双方存在两个合同关系，纸质合同的内容必须与在线签署的合同内容一致，在线签署的合同内容与纸质合同的约定不一致的，以前者的约定为准。<br>	甲、乙双方本着平等、互利、真诚合作的原则，经协商，达成如下协议：<br>	1、甲方自愿购买一万九仟元整（19000元整）套餐，同时拥有80张邀请商家的授权码。<br>	2、甲方购买套餐后，乙方同意甲方成为野猫网微区域合伙人。乙方承认甲方微区域合伙人资质，签约三年高级合作伙伴，一年内必须推广80个有效商家或推广10名推广商团队，前243名可参加野猫网年度净利润8%分红权。<br>	3、乙方必须做好对甲方的沟通工作，若政策的改变及时通知甲方。乙方如因变化发展需要调整，则乙方有义务提前15天通知甲方。<br>	4、甲方可享受锁定街道（镇）所在区域范围内野猫网平台线下合作商家产生所有订单分润的4%奖励。<br>	5、微区域合伙人需通过乙方提供授权码，在同一街道/镇招募线下商家进驻不少于10家方能获得上述锁定区域订单分润4%奖励。<br>	6、甲方成为微区域合伙人，享有推荐微区域合伙人权，分润权、IPO分红，但不包括拥有并分配股权、投票权在内等董事会权利。<br>	7、甲方有义务对乙方平台模式、机制、政策等保密并严格遵守。否则乙方有权取消甲方微区域合伙人资格，并无需承担任何赔偿责任。<br>	8、协约期限从签订即日起三年期满，合约期满后，根据市场价格续费，合同自动顺延；否则无效。<br>	9、甲方考核要求：在协议期内，甲方需按乙方考核微区域合伙人所推荐的推广商数量，同一街道/镇使用授权码招募线下商家进驻不得少于10家，需首次在本街道完成10家商户进驻指标，并经乙方查证确认方可生效，否则乙方有权取消甲方微区域合伙人资格，并无需承担任何赔偿责任。<br>	10、甲方通过输入支付宝/微信账户密码确认支付的方式来确认本合同,与乙方加盖公章的行为具有相同的法律效力。<br>	11、本合同的效力、解释、变更、执行及争议的解决等均适用中华人民共和国法律。因本合同产生的任何争议，双方应协商解决，协商不成的，应提交被告住所地有管辖权的人民法院裁决。<br>	12、本合同一式两份，双方各执一份，具有同等法律效力。",
    tgsgoods: {},
    wqgoods: {},
    authorization: "",
    level: '',
    xieyi: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getGoodsInfo();
  },

  // 获取商品信息
  getGoodsInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.toagency", {}, function(res) {
      console.log(res);
      if (res.agentlevel >= 1) {
        that.setData({
          wqgoods: {
            money: res.chajia,
            tzcodenum: res.chajiatzcodenum
          },
          tgsgoods: res.levelgoods.tgs,
        })
        if (res.authorization.authorization_status == 1) {
          that.setData({
            authorization: res.authorization,
          })
        }
      } else {
        that.setData({
          wqgoods: res.levelgoods.jiedao,
          tgsgoods: res.levelgoods.tgs,
        })
      }
    })
  },

  // 选择类型
  radioChange: function(e) {
    var value = e.detail.value;
    if (value == "tgs") {
      this.setData({
        richData: this.data.tgsXY,
        protocolTitle: "推广商协议",
        level: 1
      })
    } else if (value == "wequ") {
      this.setData({
        richData: this.data.tgsXY,
        protocolTitle: "微区合伙人协议",
        level: 2
      })
    } else {
      this.setData({
        richData: this.data.tgsXY,
        protocolTitle: "推广商协议",
        level: 3
      })
    }
  },

  checkboxChange: function(e) {
    console.log(e.detail.value);
    if (e.detail.value.length > 0) {
      this.setData({
        xieyi: true,
      })
    } else {
      this.setData({
        xieyi: false,
      })
    }
  },

  // 支付
  pay: function() {
    var that = this;
    if (this.data.level == "") {
      a.toast("请选择购买类型", "none");
      return;
    } else if (!this.data.xieyi) {
      a.alert("必须阅读并同意相关协议才能购买");
      return;
    } else if (!this.data.isPay) {
      return;
    }
    this.setData({
      isPay: false
    })
    a.loading();
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.toagency.creatagencyorder", {
      levelid: this.data.level,
      paytype: "wechat",
    }, function(res) {
      console.log(res);
      if (res.error == 0) {
        a.post("/app/ewei_shopv2_api.php?i=1&r=order.orderpay.sharecode_pay", {
          orderid: res.id,
          paytype: "wechat"
        }, function(res) {
          console.log(res);
          if (res.error == 0) {
            wx.requestPayment({
              timeStamp: res.timeStamp,
              nonceStr: res.nonceStr,
              package: res.package,
              signType: 'MD5',
              paySign: res.paySign,
              success(res) {
                console.log(res);
                a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.toagency.sendsuccessmsg", {}, function(res) {
                  console.log(res);
                  wx.switchTab({
                    url: '/pages/member/index/index',
                  })
                })
              },
              fail(res) {
                console.log(res);
                a.hideLoading()
                a.alert("支付失败");
                that.setData({
                  isPay: true,
                })
              }
            })
          }
        })
      }
    })
  },

  // 阅读协议
  check: function() {
    this.setData({
      isShow: true
    })
  },

  // 关闭窗口
  close: function() {
    this.setData({
      isShow: false,
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