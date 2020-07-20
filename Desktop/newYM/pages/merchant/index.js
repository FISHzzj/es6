// pages/merchant/index.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageInfo: {},
    codeQR: false,
    qrUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.hideShareMenu()
  },

  // 扫描验券
  scan: function() {
    var that = this;
    wx.scanCode({
      success(res) {
        console.log(res);
        var paramList = res.result.split("?")[1].split("&");
        var orderid = paramList.pop().split('=')[1];
        var couponid = paramList.pop().split('=')[1];
        console.log(orderid, couponid)
        a.post("/app/ewei_shopv2_api.php?i=1&r=merch.member.verification",{
          orderid: orderid,
          couponid: couponid,
        },function(res){
          console.log(res);
          if(res.error==0){
            a.success("核券成功");
          }else{
            a.alert(res.message)
          }
        })
      }
    })
  },

  // 推广二维码
  popularize: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.sharecode&type=ismerch", {
      type: 'ismerch'
    }, function(res) {
      console.log(res.img);
      wx.downloadFile({
        url: res.img,
        success: function(res) {
          console.log(res);
          //图片保存到本地
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function(data) {
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function(err) {
              console.log(err);
              if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
                console.log("当初用户拒绝，再次发起授权")
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
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
        qrUrl: res.img,
        codeQR: true,
      })
    })
  },

  // 收款二维码
  collection: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.paycode", {}, function (res) {
      console.log(res.img);
      wx.downloadFile({
        url: res.img,
        success: function (res) {
          console.log(res);
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
                    console.log(settingdata)
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
        qrUrl: res.img,
        codeQR: true,
      })
    })
  },

  // 关闭二维码
  clsoe: function() {
    this.setData({
      codeQR: false,
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
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.member.merchmanage", {}, function(res) {
      console.log(res);
      that.setData({
        pageInfo: res,
      })
    })
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