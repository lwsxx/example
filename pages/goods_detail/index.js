// pages/goods_detail/index.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    isCollect:false
  },
  goodsInfo:{}, //商品内容的全局变量

  //获取页面初始数据
  async start(goods_id){
    const res = await request({url:'/goods/detail',data:{goods_id}})
    let goodsDetail = res.data.message
    this.goodsInfo=goodsDetail
    //获取当前缓存中是否存在收藏collect数组
    let collect = wx.getStorageSync('collect')||[]
    //判断当前商品是否被收藏,存在返回true
    let isCollect = collect.some(v=>v.goods_id === this.goodsInfo.goods_id)
    this.setData({
      goodsDetail:{
        pics:goodsDetail.pics,
        goods_price:goodsDetail.goods_price,
        goods_name:goodsDetail.goods_name,
        //部分iphone机型不支持webp图片格式，可临时将其全部替换成jpg格式
        goods_introduce:goodsDetail.goods_introduce.replace(/\.webp/g,'.jpg')
      },
      isCollect
    })
  },
  
  //点击轮播图，放大预览
  handlePrevewImage(e){
    //构造要预览的图片数组
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid)
    //接收传过来的当前图片的url
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      urls,
      current
    })
  },

  /**
   * 添加购物车方法（使用缓存数据，数据格式为数组）
   */
  addCart(){
    //获取缓存中的购物车数据，假如没有则为空数组
    let cart = wx.getStorageSync('cart')||[]
    //判断当前的商品是否存在于购物车中（判断方法：购物车内是否有商品id=当前页面的商品id）
    let index = cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    if(index === -1){
      //不存在，将该商品第一次添加进购物车，添加新属性num，赋值为1
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      //将商品内容添加进cart
      cart.push(this.goodsInfo)
      //存入缓存中
      wx.setStorageSync('cart', cart)
    }
    else{
      //已经存在，num++
      cart[index].num++
    }
    //无论存在与否，都要将购物车数据存于缓存中
    wx.setStorageSync('cart',cart)
    //弹出添加成功提示
    wx-wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true,
    })
  },

  //收藏转换方法
  handleCollect(){
    let isCollect = false
    //获取当前缓存中是否存在收藏collect数组
    let collect = wx.getStorageSync('collect')||[]
    //判断当前商品是否被收藏,存在返回true
    let goods_index = collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id)
    if(goods_index!=-1){
      //代表能找到，点击为取消收藏
     isCollect=false
      collect.splice(goods_index,1)
      wx.showToast({
        title: '取消收藏成功',
        icon: 'success',
        duration: 2000,
        mask:true
      })
    }else{
      isCollect=true
      collect.push(this.goodsInfo)
      wx.showToast({
        title: '商品收藏成功',
        icon: 'success',
        duration: 2000,
        mask:true
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
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
    const pages = getCurrentPages()
    let currentPages = pages[pages.length-1]
    let {goods_id} = currentPages.options
    console.log(goods_id)
    this.start(goods_id)
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