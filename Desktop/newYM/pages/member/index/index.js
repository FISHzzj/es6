var e = getApp(),
  r = e.requirejs("core"),
  t = e.requirejs("wxParse/wxParse");
Page({
  data: {
    route: "member",
    icons: e.requirejs("icons"),
    member: {},
    isShow: false,
    inviteQR: '',
    avatar: false,
    isHide: '',
    isinformation: 0,
    memberBG: "http://ym.czbke.com/addons/wx_shop/static/images/bgtupian.png",
    rectangleBG: "http://ym.czbke.com/addons/wx_shop/static/images/beijingtu.png"
  },

  onLoad: function (options) {
    var param = {};
    if (options.scene) {
      var scene = decodeURIComponent(options.scene).split("&");
      for (var i = 0; i < scene.length; i++) {
        param[scene[i].split("=")[0]] = scene[i].split("=")[1];
      }
    } else {
      param = options;
    }
    console.log(param)
    if (param!=""){
      setTimeout(()=>{
        r.post("wxapp/bindpid", { mid: param.mid }, function (res) {
          console.log(res)
        })
      },1500)
    }
    this.isHideF();
    e.url(options),
      "" == e.getCache("userinfo") && wx.redirectTo({
        url: "/pages/message/auth/index"
      })
  },

  // 是否审核
  isHideF: function () {
    var that = this;
    r.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.switch", {}, function (res) {
      e.globalData.isHide = res.tgs
      that.setData({
        isHide: res.tgs == 1 ? true : false,
      })
    })
  },

  // 获取信息
  getInfo: function () {
    var e = this;
    r.get("/app/ewei_shopv2_api.php?i=1&r=member&comefrom=wxapp&openid=" + getApp().globalData.opId + "&unionid=" + getApp().globalData.unionid, {}, function (r) {
      0 != r.error ? wx.redirectTo({
        url: "/pages/message/auth/index"
      }) :
        e.setData({
          member: r,
          show: !0,
          isinformation: r.isinformation,
        }),
        t.wxParse("wxParseData", "html", r.copyright, e, "5")
    })
  },

  // 获取微信用户信息
  getWXuserInfo: function (event) {
    // console.log(event);
    var that = this;
    if (event.detail.errMsg == "getUserInfo:fail auth deny") {
      return;
    }
    var info = JSON.parse(event.detail.rawData);
    r.post("wxapp.userinfouserinfo", {
      encryptedData: event.detail.encryptedData,
      iv: event.detail.iv,
      sessionKey: getApp().globalData.session_key,
    }, function (res) {
      // console.log(res);
      console.log(res["Another_account"]);
      if (res["Another_account"] != '') {
        wx.showModal({
          title: '提示',
          content: '检测您已是公众号会员，是否进行账号合并？',
          confirmText: '确认合并',
          success() {
            r.post("wxapp.consolidatedAccounts", {
              encryptedData: event.detail.encryptedData,
              iv: event.detail.iv,
              sessionKey: getApp().globalData.session_key,
            }, function (res0) {
              // console.log(res0);
              if (res0.error == 0) {
                r.success("合并成功")
              } else {
                r.alert(res0.message);
              }
            })
          }
        })
      }
      that.getInfo()
    })
    this.setData({
      avatar: info.avatarUrl
    })
  },
  // 跳转到订单页
  toOrder: function(e){
    getApp().globalData.orderStatus = e.currentTarget.dataset.status;
    wx.switchTab({
      url: '/pages/order/index',
    })
  },
  // 扫码
  scan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        console.log(res)
        wx.navigateTo({
          url: '/' + res.path,
        })
      }
    })
  },
  // 成为推广商
  tobemerchant: function () {
    if (this.data.member.binded == 0) {
      r.toast("请先绑定手机号码", "none")
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/member/identification/identification',
        })
      }, 1000)
    } else if (this.data.member.is_authentication == 0) {
      r.toast("请先进行身份验证", "none")
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/member/identification/identification',
        })
      }, 1000)
    } else {
      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/member/tobemerchant/tobemerchant',
        })
      }, 1000)
    }
  },
  // 页面显示
  onShow: function () {
    this.getInfo()
  },
  // 右上角分享
  onShareAppMessage: function () {
    return r.onShareAppMessage()
  },
  //授权获取用户信息
  onGotUserInfo: function (i) {
    var n = this,
      a = e.getCache("userinfo");
    a = i.userInfo;
    if (a && !a.needauth)
      return void (t && "function" == typeof t && t(a));
    if (i.detail.errMsg == 'getUserInfo:ok') {
      wx.login({
        success: function (o) {
          if (!o.code)
            return void r.alert("获取用户登录态失败:" + o.errMsg);
          r.post("wxapp/login", {
            code: o.code
          }, function (o) {
            return o.error ? void r.alert("获取用户登录态失败:" + o.message) : o.isclose && i && "function" == typeof i ? void i(o.closetext, !0) : void r.get("wxapp/auth", {
              data: i.detail.encryptedData,
              iv: i.detail.iv,
              sessionKey: o.session_key
            }, function (e) {
              n.getInfo();
            })
          })
        }
      })
    }
  },
  // 邀请好友二维码
  showQR: function () {
    var that = this;
    r.post("/app/ewei_shopv2_api.php?i=1&r=member.sharecode", {}, function (res) {
      var url = res.img;
      wx.downloadFile({
        url: url,
        success: function (res) {
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function (data) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })

            },
            fail: function (err) {
              console.log(err);
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                console.log("当初用户拒绝，再次发起授权")
                wx.openSetting({
                  success(settingdata) {
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                    } else {
                      console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                    }
                  }
                })
              }
            },
            complete(res) {
              console.log(res);
            }
          })
        }
      })
      that.setData({
        inviteQR: res.img,
        isShow: true,
      })
    })
  },
  // 关闭海报
  close: function () {
    this.setData({
      isShow: false,
    })
  },
  // 合并账号
  combine: function (e) {
    console.log(e);
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      return;
    }
    r.post("wxapp.consolidatedAccounts", {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      sessionKey: getApp().globalData.session_key,
    }, function (res0) {
      console.log(res0);
      if (res0.error == 0) {
        r.success("合并成功")
      } else {
        r.alert(res0.message);
      }
    })
  },
  // 签到
  signIn: function () {
    r.post("/app/ewei_shopv2_api.php?i=1&r=member.signin", {}, function (res) {
      if (res.status == 1) {
        wx.showToast({

          title: res.log,

          icon: 'none',

          duration: 1500

        })
      }
    })
  },
  // 商家管理
  merchant: function () {
    var that = this;
    r.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.regstate", {}, function (res) {
      if (res.error == 0) {
        if (res.status == 1) {
          wx.redirectTo({
            url: '/pages/merchant/index',
          })
        } else {
          wx.navigateTo({
            url: '/pages/merchant/enter/index?status=' + res.status,
          })
        }
      } else {
        r.alert(res.message);
      }
    })
  },
})