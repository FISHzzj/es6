// pages/my/account/account.js
var app = getApp(), a = app.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    member: {},
    headImg: '',
    type: '',
    inputValue: '',
    isRealName: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.isrealname();
  },

  // 获取数据
  getData: function(){
    var that = this;
    a.post("/app/ewei_shopv2_api.php?i=1&r=member.info",{},function(res){
      console.log(res);
      if(res.error==0){
        that.setData({
          member: res.member,
          headImg: res.member.avatar || res.member.avatar_wechat,

        })
      }
    })
  },

  // 是否实名认证
  isrealname: function(){
    var that = this;
    a.get("/app/ewei_shopv2_api.php?i=1&r=member.authentication",{},function(res){
      console.log(res);
      if(res.error==0){
        that.setData({
          isRealName: res.ischeck,
        })
      }
    })
  },

  // 实名认证
  compile: function(e){
    
    var type = e.currentTarget.dataset.type;
    if(type=="verify"&&this.data.isRealName==1){
        return
    }
    this.setData({
      show: false,
      type: type,
    })
  },

  // 上传图片
  uploadImg: function(){
    var that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        console.log(res);
        a.loading("正在上传....");
        var o = a.getUrl("util/uploader/upload", {
          file: "file"
        }),i = res.tempFilePaths;
        wx.uploadFile({
          url: o,
          filePath: i[0],
          name: 'file',
          success(res){
            console.log(res)
            var imgUrl = JSON.parse(res.data).files[0].tomedia_img
            that.setData({
              headImg: imgUrl
            })
            a.hideLoading()
          }
        })
      },
    })
  },

  // 输入事件
  input:function(e){
    var value = e.detail.value;
    this.setData({
      inputValue: value,
    })
  },

  // 提交
  submit: function(){
    var that = this;
    if (this.data.type =='headImg'){
      a.post("/app/ewei_shopv2_api.php?i=1&r=member.info.editheadpic", { avatar: that.data.headImg }, function (res) {
        console.log(res);
        if (res.status == 1) {
          a.toast("修改成功");
          that.getData();
          that.setData({
            show: true,
            type: ''
          })
        }
      })
    }else if(this.data.type=='name'){
      if (this.data.inputValue==''){
        a.toast('请填写新的昵称','none')
      }else{
        a.post("/app/ewei_shopv2_api.php?i=1&r=member.info.nickname&nickname=%E6%AC%B2%E6%B3%AA",{
          nickname: that.data.inputValue
        },function(res){
          console.log(res);
          if(res.status==1){
            a.toast("修改成功");
            that.getData();
            that.setData({
              show: true,
              type: ''
            })
          }
        })
      }

    } else if (this.data.type =='verify'){

    }
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})