// pages/img/img.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fenlei : [
      {
        id:1,
        name:"外套"
      },
      {
        id:2,
        name:"内搭"
      },
      {
        id:3,
        name:"裙子"
      },
      {
        id:4,
        name:"裤子"
      },
      {
        id:5,
        name:"上衣"
      },
    ],
    num:0,
    list:[
      {
        id:0,
        name:"apple",
        value:"apple"
      },
      {
        id:1,
        name:"banana",
        value:"banana"
      },
      {
        id:2,
        name:"orange",
        value:"orange"
      },
    ],
    checkedList:[],
    tabs: [
      {
        id: 0,
        name:"首页",
        isActive:true
      },
      {
        id: 1,
        name:"原创",
        isActive:false
      },
      {
        id: 2,
        name:"分类",
        isActive:false
      },
      {
        id: 3,
        name:"关于",
        isActive:false
      },
    ],
  },
handleinput(e){
  this.setData({
    num:e.detail.value
  })
},
handletap(e){
  const operation = e.currentTarget.dataset.operation
  this.setData({
    num:this.data.num + operation
  })
},
getPhoneNumber(e) {
  console.log(e)
  console.log(e.detail)
},
getUserInfo(e){
  console.log(e)
},
handleItemChange(e){
  let checkedList = e.detail.value
  this.setData({
    checkedList
  })
},

//自定义事件，用来接收子组件传递的数据的
handleChange(e){
  //接收传递过来的参数
  const {index} = e.detail
  let {tabs} = this.data
  tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
  this.setData({
    tabs
  })

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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