// pages/auth/index.js
import {request} from "../../request/index"
import regeneratorRuntime from "../../lib/runtime/runtime"
import {login} from "../../utils/asyncWx"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //获取用户信息
  async handleGetUserInfo(e){
    try {
      //获取token所需要的参数
    const {encryptedData, rawData, iv, signature} = e.detail;
    //获取小程序登陆成功后的code
    const {code} = await login()
    const params = {encryptedData, rawData, iv, signature, code}
    //发送请求获取token(不是企业号，暂无支付权限，没有token)
    const res = await request({url:"/users/wxlogin",data:params,method:"post"})
    const {token} = res.data
    wx.setStorageSync('token', token)
    wx.navigateBack({
      delta: 1,
    })
    } catch (error) {
      console.log(error)
    }
    
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