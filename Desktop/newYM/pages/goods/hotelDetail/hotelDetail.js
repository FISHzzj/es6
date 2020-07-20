// pages/goods/hotelDetail/hotelDetail.js
var app = getApp(),
  a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面数据
    bannerList: [],
    hotelInfo: {},
    starTime: '',
    endTime: '',
    day: 1,
    isMask: false,
    isDetail: false,
    bf: 0,
    bigBed: 0,
    wBed: 0,
    total: '',
    commentList: [],
    roomDetail: {},
    // 请求数据
    merchid: '',
    isLike: 0, 
    condition: '1',
    page: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotelInfo(options.merchid);
    var myDate = new Date();
    var year = myDate.getFullYear()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var tomorrow = myDate.getDate() + 1
    if (day<10){
      day = '0'+day
    }
    if (tomorrow<10){
      tomorrow = '0' + tomorrow
    }
    if(month<10){
      month = '0'+ month
    }
    this.setData({
      merchid: options.merchid,
      starTime: year + '-' + month + '-' + day,
      endTime: year + '-' + month + '-' + tomorrow,
    })
    this.getRoomList();
    this.getcomment();
  },

  // 获取酒店信息
  getHotelInfo: function(id){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.hotelstore",{
      merchid: id
    },function(res){
      console.log(res);
      that.setData({
        bannerList: res.store_images,
        hotelInfo: res.merch_detail,
      })
    })
  },

  // 获取店铺评论
  getcomment: function () {
    var that = this;
    if (this.data.total != '' && this.data.commentList.length >= this.data.total) {
      a.alert("没有更多评论了");
      return;
    }
    a.loading();
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore.get_commentlist", {
      merchid: this.data.merchid,
      page: this.data.page,
    }, function (res) {
      console.log(res);
      that.setData({
        commentList: that.data.commentList.concat(res.list),
        total: res.total,
      })
      a.hideLoading();
    })
  },

  // 获取房间列表
  getRoomList: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.hotelstore.get_room_list",{
      page: 1,
      merchid: this.data.merchid,
      hotel_condition: this.data.condition,
      startDate: this.data.starTime,
      endDate: this.data.endTime,
    },function(res){
      console.log(res);
      that.setData({
        roomList: res.list
      })
    })
  },
  
  // 获取房间信息
  getRoomInfo: function(e){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.hotelstore.getgoodinfo",{
      goodsid: e,
    },function(res){
      console.log(res);
      that.setData({
        roomDetail: res,
        isMask: true,
        isDetail: true
      })
    })
  },

  // 收藏&取消收藏
  collet: function () {
    var that = this;
    var iscollect = this.data.isLike == 0 ? 'yes' : 'no'
    a.post("/app/ewei_shopv2_api.php?i=1&r=merchshop.merchstore.collect", {
      iscollect: iscollect,
      merchid: this.data.merchid,
      type: 0,
    }, function (res) {
      console.log(res);
      that.setData({
        isLike: res.islike,
      })
    })
  },

  // 拉起导航
  nav: function () {
    var lat = Number(this.data.hotelInfo.lat)
    var lng = Number(this.data.hotelInfo.lng)
    wx.openLocation({
      latitude: lat,
      longitude: lng,
      name: this.data.hotelInfo.merchname,
      scale: 18,
      address: "地址详细说明"
    })
  },

  // 打电话
  call: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.hotelInfo.storephone,
    })
  },

  // 酒店条件
  typeSelect: function(e){
    var that = this;
    var condition = e.detail.value
    that.setData({
      bf: 0,
      bigBed: 0,
      wBed: 0
    })
    for(var i = 0;i<condition.length;i++){
      if (condition[i]=='1'){
        that.setData({
          bf: 1
        })
      } else if (condition[i] == '2'){
        that.setData({
          bigBed: 1
        })
      } else if (condition[i] == '3'){
        that.setData({
          wBed: 1
        })
      }else{
        return;
      }
    }
    that.setData({
      condition: condition.join("-")
    })
    this.getRoomList()
  },

  // 查看房间信息
  detail: function(e){
    var id = e.currentTarget.dataset.id;
    this.getRoomInfo(id)
  },
  
  close: function(){
    this.setData({
      isDetail: false,
      isMask: false
    })
  },

  // 房间预订
  book: function(e){
    var goodsid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/goods/hotelDetail/hotelOrder?merchid=' + this.data.merchid + "&goodsid=" + goodsid + "&startdate=" + this.data.starTime + "&enddate=" + this.data.endTime,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  // 日期组件
  dianji: function () {
    this.yunxin()//调用回调函数
    // this.setData({
    //   isMask: true
    // })
  },
  yunxin: function () {
    var that = this;
    that.rili = that.selectComponent("#rili")
    var starTime = ''
    var day = ''
    var endTime = ''
    that.rili.xianShi({
      data: function (res) {
        if (res != null) {
          if (res.length == 1) {
            starTime = res[0].data
            day = 0
            endTime = "未选择"
          }
          else if (res.length == 2) {
            starTime = res[0].data
            endTime = res[1].data
            day = res[1].chaDay
          }
        }
        else {
          starTime = ''
          day = ''
          endTime = ''
        }
        that.setData({
          starTime: starTime,
          endTime: endTime,
          day: day,
          isMask: false
        })
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page+=1,
    })
    this.getcomment()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})