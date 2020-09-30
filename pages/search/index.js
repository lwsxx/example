// pages/search/index.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList:[],
    //设置变量：input框有值输入时，取消按钮显示，否则隐藏
    isFoucs:false,
    inputValue:''

  },
  //防抖，设置全局定时器变量
  TimeId:-1,

  //输入框的值改变就会触发的事件
   handleInput(e){
    const {value} = e.detail
    //检测输入值是否合法,是否为空
    if(!value.trim()){
      //值不合法,取消按钮隐藏，搜索列表置空
      this.setData({
        isFoucs:false,
        searchList:[],
      })
      return;
    }
    //检测通过，取消按钮显示
    this.setData({
      isFoucs:true,
      inputValue:value
    })
    //定时器，稳定一秒后发情请求
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.search(value)
    },1000)
    //发送请求获取数据
   
  },

  //发送请求
  async search(query){
    let res = await request({url:"/goods/qsearch",data:{query}})
    console.log(res.data.message)
    this.setData({
      searchList:res.data.message
    })
  },

  //取消按钮实现方法：点击取消，input框清空，搜索列表置空，取消按钮隐藏
  handleCancel(){
    this.setData({
      inputValue:'',
      searchList:[],
      isFoucs:false
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