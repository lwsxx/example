// pages/pay/index.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {requestPayment} from "../../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cartList:[],
    totalPrice:0,
    totalNum:0,
    addressAll:''

  },

  //结算支付按钮
  async handleOrderPay(){
    try {
      //先判断缓存中是否有token(无权限获取不到token，暂时设为假token)
    //const token = wx.getStorageSync('token')
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    //如果不存在token就先跳转到授权页面获取token
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    //存在token，创建订单，获取订单编号
    //准备请求头参数
    const header = {Authorization:token}
    //准备请求体参数
    const order_price = this.data.totalPrice
    const consignee_addr = this.data.addressAll
    const cart = this.data.cartList
    let goods = []
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.goods_number,
      goods_price:v.goods_price
    }))
    //发送请求,创建订单 获取订单编号
    const {params} = {order_price,consignee_addr,goods}
    const res = await request({url:"/my/orders/create",methods:"POST",data:params,header})
    const order_number = res.data.message.order_number
    //准备预支付，获取支付参数pay
    const res1 = await request({url:"/my/orders/req_unifiedorder",methods:"POST",data:{order_number},header})
    const {pay} = res1.data.message
    //直接发起微信支付wx.requestPayment(pay)
    await requestPayment(pay)
    const res2 = await request({url:"/my/orders/chkOrder",methods:"POST",data:{order_number},header})
    wx.showToast({
      title: '支付成功',
    })
    //获取全部购物车数据，过滤掉已经选中支付的商品，只留下未被支付的商品数据
    let newCart = wx.getStorageSync('cart')
    newCart.filter(v=>!v.checked)
    //将已经移除掉支付过的商品数据存入缓存中，用于购物车页面
    wx.setStorageSync('cart', newCart)
    wx.navigateTo({
      url: '/pages/order/index',
    })
    } catch (error) {
      wx.showToast({
        title: '支付失败',
        icon: 'none',
      })
      wx.navigateTo({
        url: '/pages/order/index',
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //计算总价格，总数量


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const address = wx.getStorageSync('address')
    const addressAll = address.provinceName + address.cityName + address.countyName + address.detailInfo
    let cartList = wx.getStorageSync('cart')||[]
    //过滤数组,商品的checked属性必须为true
    cartList = cartList.filter(v=>v.checked)
    let totalPrice = 0
    let totalNum = 0
    cartList.map((v,i)=>{
        totalPrice += v.num*v.goods_price
        totalNum +=v.num
    })
    this.setData({
      cartList,
      totalPrice,
      totalNum,
      address,
      addressAll
    })
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