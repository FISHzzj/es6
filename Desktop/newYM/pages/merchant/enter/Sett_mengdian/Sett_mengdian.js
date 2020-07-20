// pages/Sett_mengdian/Sett_mengdian.js
var app = getApp(),
  a = app.requirejs("core");
var QQMapWX = require('../../../../utils/qqmap-wx-jssdk.min.js'),
  qqmapsdk = new QQMapWX({
    key: 'KRPBZ-VVXC4-KOMUK-DBVQQ-CIF53-P5BYE' // 必填
  });
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '', //判断进入方式1为入驻，0为修改
    index: 0,
    region: ['请选择地址'],
    mode: "scaleToFill",
    banner: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    cList: [],
    parentList: [],
    childList: [],
    parentIndex: 0,
    childIndx: 0,
    location: {
      lat: 23.16,
      lng: 113.23
    },
    address: '',
    category: [0, 0],
    town: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideShareMenu()
    this.getcategory();
    var that = this;
    this.setData({
      type: options.type,
    })
    if (options.type == 2) {
      this.getshopInfo();
    }
    // 调用接口
    qqmapsdk.reverseGeocoder({
      // 这里没有写location选项，是因为默认就是当前位置
      success: function(res) {
        // 获取默认下的地址
        that.setData({
          location: res.result.location
        });
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        // console.log(res);
      }
    });
  },

  // 获取轮播图
  getBannerList: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.storebanner", {}, function(res) {
      for (var i = 1; i < 10; i++) {
        var key = "store_img" + i;
        if (res[key] != "") {
          that.data.banner.push(res[key]);
        }
      }
      that.setData({
        banner: that.data.banner,
      })
    })
  },

  // 获取分类信息
  getcategory: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.getcategory", {}, function(res) {
      var id = res.parentType[0].id;
      var childList = []
      for (var i = 0; i < res.childType.length; i++) {
        if (res.childType[i].parentId == id) {
          childList.push(res.childType[i])
        }
      }
      var cList = [];
      cList.push(res.parentType);
      cList.push(childList);
      that.setData({
        cList: cList,
        childList: res.childType,
        parentList: res.parentType,
      })
      // console.log(that.data.cList);
    })
  },

  // 获取门店信息
  getshopInfo: function() {
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.storeinfo", {}, function(res) {
      console.log(res);
      if (res.error == 0) {
        app.globalData.formData.area = res.area;
        app.globalData.formData.member = res.member;
        that.setData({
          memberInfo: res.member,
          category: res.category == "" ? [0, 0] : res.category.split("-"),
          town: res.area == "" ? "" : res.area.split("-")[res.area.length - 1],
        })
      } else {
        a.alert("获取门店信息失败")
      }
    })
  },

  // 去上传图片
  toUpload: function() {
    wx.reLaunch({
      url: '/pages/merchant/enter/Sett_mengdian/imglacigo',
    })
  },

  // 选择一级分类
  bindMultiPickerColumnChange: function(e) {
    var column = e.detail.column;
    var value = e.detail.value;
    var parentList = this.data.parentList;
    var childList = this.data.childList;
    var list = []
    if (column == 0) {
      var id = parentList[value].id;
      for (var i = 0; i < childList.length; i++) {
        if (childList[i].parentId == id) {
          list.push(childList[i])
        }
      }
      this.data.cList.splice(1, 1);
      this.data.cList.push(list)
      this.setData({
        cList: this.data.cList,
        // childList: list
      })
    }
  },

  // 选择分类
  bindMultiPickerChange: function(e) {
    console.log(e)
    this.setData({
      parentIndex: e.detail.value[0],
      childIndx: e.detail.value[1],
    })
  },

  // 选择门店区域
  bindRegionChange: function(e) {
    var value = e.detail.value;
    this.setData({
      region: value,
    })
  },

  // 搜索地址
  searchAddress: function() {
    var _this = this;
    // 调用接口
    console.log(_this.data.location.lat, _this.data.location.lng)
    qqmapsdk.search({
      keyword: this.data.address, //搜索关键词
      location: {
        latitude: Number(_this.data.location.lat),
        longitude: Number(_this.data.location.lng)
      }, //设置周边搜索中心点
      success: function(res) { //搜索成功后的回调
        console.log(res);
        var mks = []
        // for (var i = 0; i < res.data.length; i++) {
        //   mks.push({ // 获取返回结果，放到mks数组中
        //     title: res.data[i].title,
        //     id: res.data[i].id,
        //     latitude: res.data[i].location.lat,
        //     longitude: res.data[i].location.lng,
        //     // iconPath: "/resources/my_marker.png", //图标路径
        //     width: 20,
        //     height: 20
        //   })
        // }
        // _this.setData({ //设置markers属性，将搜索结果显示在地图中
        //   markers: mks
        // })
      },
      fail: function(res) {
        console.log(res);
      },
      complete: function(res) {
        console.log(res);
      }
    });
  },

  mapMove: function(e) {
    console.log(e)
  },

  // 表单提交
  submit: function(e) {
    console.log(e)
    var that = this
    var formData = e.detail.value;
    if (formData.introduction == "") {
      a.toast("请输入商家简介", "none")
      return;
    } else if (formData.storename == "") {
      a.toast("请输入门店名称", "none")
      return;
    } else if (formData.storephone == "") {
      a.toast("请输入门店电话", "none")
      return;
    } else if (formData.area.length < 3) {
      a.toast("请选择门店区域", "none")
      return;
    } else if (formData.store_town == "") {
      a.toast("请填写所在城镇/街道", "none")
      return;
    } else if (formData.store_address == "") {
      a.toast("请输入门店地址", "none")
      return;
    }
    a.confirm("请确认信息是否正确", function() {
      // a.confirm("门店位置将以当前位置为准，如有误可到商家中心修改",{},that.next(formData))
      wx.showModal({
        title: '提示',
        content: '门店位置将以当前位置为准，如有误可到商家中心修改',
        success: function() {
          that.next(formData)
        }
      })
    })
  },

  // 下一步跳转
  next: function(formData) {
    var that = this;
    var url
    var path
    if (this.data.type == 1) {
      url = "/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.set_storeinfo"
      path = "/pages/merchant/enter/Sett_zhenjian/Sett_zhenjian"
    } else {
      url = "/app/ewei_shopv2_api.php?i=1&r=merch.registerinfo.up_storeinfo";
      path = "/pages/merchant/index"
    }
    // formData.category = formData.category.split(",")
    a.post(url, {
      onecategory: this.data.parentList[formData.category[0]].id,
      twocategory: this.data.childList[formData.category[1]].id,
      store_province: formData.area[0],
      store_city: formData.area[1],
      store_area: formData.area[2],
      store_town: formData.store_town,
      introduction: formData.introduction,
      storename: formData.storename,
      storephone: formData.storephone,
      store_address: formData.store_address,
      lat: this.data.location.lat,
      lng: this.data.location.lng,
    }, function(res) {
      console.log(res);
      if (res.status == 1) {
        a.success(res.message);
        wx.redirectTo({
          url: path,
        })
      } else {
        a.toast(res.message, "none")
      }
    })
  },

  // 记录输入数据
  formChange: function(e){
    var name = e.currentTarget.dataset.name;
    var value = e.detail.value;
    app.globalData.formData[name] = value
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
    this.getBannerList();
    this.setData({
      region: app.globalData.formData.area,
      member: app.globalData.member,
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