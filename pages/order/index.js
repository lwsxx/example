// pages/order/index.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ordersList:[],
    tab:[
      {
        id:0,
        name:'全部',
        isActive:true
      },
      {
        id:1,
        name:'待付款',
        isActive:false
      },
      {
        id:2,
        name:'待收款',
        isActive:false
      },
      {
        id:3,
        name:'退款/退货',
        isActive:false
      }
    ]
  },

  handleChange(e){
    console.log(e.detail)
    let {index} = e.detail
    this.changeTab(index)
  },

  //将点击切换效果封装成函数
  changeTab(index){
    let {tab} = this.data
    tab.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tab
    })
    //当type为1时，tab的index为0
    this.getOrders(index+1)
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
    //先判断当前有没有token，没有需要跳转到授权页面
    //const token = wx.getStorageSync('token')
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return
    }
    //获取当前小程序的页面栈
    const pages = getCurrentPages()
    let currentPages = pages[pages.length-1]
    let {type} = currentPages.options
    //当type为1时，tab的index为0
    this.changeTab(type-1)
    this.getOrders(type)
  },

  //获取订单
  async getOrders(type){
    const token = wx.getStorageSync('token')
    const header = {Authorization:token}
    const res = await request({url:"/my/orders/all",header,data:{type}})
    //造假数据
    let data = [
      {
        "order_id": 428,
        "user_id": 23,
        "order_number": "HMDD20190802000000000428",
        "order_price": 13999,
        "order_pay": "0",
        "is_send": "否",
        "trade_no": "",
        "order_fapiao_title": "个人",
        "order_fapiao_company": "",
        "order_fapiao_content": "",
        "consignee_addr": "广东省广州市海珠区新港中路397号",
        "pay_status": "1",
        "create_time": 1564731518,
        "update_time": 1564731518,
        "order_detail": null,
        "goods": [
          {
            "id": 717,
            "order_id": 428,
            "goods_id": 43986,
            "goods_price": 13999,
            "goods_number": 1,
            "goods_total_price": 13999,
            "goods_name": "海信(Hisense)LED55MU9600X3DUC 55英寸 4K超高清量子点电视 ULED画质 VIDAA系统",
            "goods_small_logo": "http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000160455569_1_400x400.jpg"
          }
        ],
        "total_count": 1,
        "total_price": 13999
      }
    ]
    this.setData({
      //ordersList:res.data.message.orders.map
      ordersList:data.map(v=>({...v,create_time_cn:(new Date(v.create_time * 1000).toLocaleString())}))
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