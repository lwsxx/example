//Page Object
import {request} from "../../request/index"
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    cateList:[],
    //楼层数组
    floorList:[]
    
  },
  //options(Object)
  onLoad: function(options) {
    //1.发送异步请求获取轮播图数据
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (res) => {
    //     this.setData({
    //       swiperList:res.data.message
    //     })
    //   },
    // });
    this.getSwiperList(),
    this.getCateList(),
    this.getFloorList()

      
    
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  },

  //获取轮播图数据
  getSwiperList(){
    request({url:"/home/swiperdata"})
    .then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  },

  //获取导航数据
  getCateList(){
    request({url:"/home/catitems"})
    .then(res=>{
      this.setData({
        cateList:res.data.message
      })
    })
  },

  //获取楼层数据
  getFloorList(){
    request({url:"/home/floordata"})
    .then(res=>{
      this.setData({
        floorList:res.data.message
      })
    })
  },
});
  