// pages/goods_list/index.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:[],
    tab:[
      {
        id:0,
        name:'综合',
        isActive:true
      },
      {
        id:1,
        name:'销量',
        isActive:false
      },
      {
        id:2,
        name:'价格',
        isActive:false
      }
    ]

  },
  Query:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  //设置总页数的全局变量
  totalPages:1,
  async start(){
    const res = await request({url:"/goods/search",data:this.Query})
    //总页数=获取到的总条数/每页的页容量（向上取整）
    this.totalPages = Math.ceil(res.data.message.total / this.Query.pageSize)
    this.setData({
      //数组拼接
      goodsList:[...this.data.goodsList,...res.data.message.goods]
    })
    //请求成功以后关闭等待刷新效果
    wx.stopPullDownRefresh()
  },
  handleChange(e){
    console.log(e.detail)
    let {index} = e.detail
    let {tab} = this.data
    tab.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tab
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.Query.cid = options.cid
    this.start()

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
    this.setData({
      goodsList:[]
    })
    this.Query.pagenum=1;
    this.start()

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //判断有没有下一页数据
      //判断当前页码是否大于等于总页数，大于则没有
    if(this.Query.pagenum>=this.totalPages){
     wx.showToast({
       title: '没有下一页数据啦',
     })
    }else{   //否则，当前页码++，重新调用请求
      this.Query.pagenum++;
      this.start();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})