// pages/category/index.js
import {request} from "../../request/index"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0,
    scrollTop:0

  },
  Cates:[],
  //左侧菜单的点击事件
  handleItemTap(e){
    let {index} = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取本地存储中的缓存数据
        //假如没有，发送请求获取数据
        //存在缓存中的数据，同时旧的数据没有过期 就使用缓存中的数据
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      this.getCates()
    }
    else{
      if(Date.now()-Cates.time>1000*10){
        this.getCates()
      }
      else{
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v=>v.cat_name)
        //构造右侧菜单数据
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
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

  },

  //获取分类数据
  getCates(){
    request({
      url:"/categories"
    })
    .then(res=>{
      this.Cates = res.data.message
      //将获取到的数据存入本地存储中
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
      //构造左侧大菜单
      let leftMenuList = this.Cates.map(v=>v.cat_name)
      //构造右侧菜单数据
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  }
})