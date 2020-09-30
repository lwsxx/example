// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList:[],
    address:{},
    openSetting:'',
    allChecked:false,
    totalPrice:0,
    totalNum:0,

  },
  cartListInfo:[],

  //获取缓存中的购物车数据
  start(){
    let cartList = wx.getStorageSync('cart')
    this.cartListInfo = cartList
    this.setData({
      cartList
    })
  },

  //点击获取收货地址
  handleChooseAddress(e){
    // console.log(e)
    // wx.createSelectorQuery().select('#address_button').boundingClientRect().exec(function(res) {
    //   var resmy = res
    //   console.log(resmy)
    // })
    //获取权限状态
    wx.getSetting({
      success: (result) => {
         //先判断授权项是否已授权  authSetting scope 为true代表已授权，可直接调用获取收货地址api；  为false代表未授权，需要诱导用户打开设置授权页面
        const scopeAddress = result.authSetting["scope.address"]
        if(scopeAddress === false){ 
          wx.openSetting({   //诱导用户打开设置页面
            success: (result1) => {
            },
          })
        }
        wx.chooseAddress({
          success: (address) => {
            wx.setStorageSync('address', address)
          },
        })
      },
    })
  },

  //商品数量编辑
  handleChangeNum(e){
    console.log(e)
    let {id,operation} = e.currentTarget.dataset
    let {cartList} = this.data
    let goods_index = cartList.findIndex(v=>v.goods_id===id)
    //判断是否要删除商品  当商品数量为1并且仍然进行减操作时提示删除商品
    if(cartList[goods_index].num === 1 && operation === -1){
      wx.showModal({
        content: '您是否要删除商品？',
        showCancel: true,
        title: '提示',
        success: (res) => {
          if (res.confirm) {
            cartList.splice(goods_index,1)
            this.setCart(cartList)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
      })
    }else{
      cartList[goods_index].num += operation
      this.setCart(cartList)
    }
  },

  //商品选中效果
  handleChangeChecked(e){
    let goods_id = e.currentTarget.dataset.id
    //根据选中的商品id获取商品对象，并对其选中状态取反
    let {cartList} = this.data
    let index = cartList.findIndex(v=>v.goods_id === goods_id)
    cartList[index].checked = !cartList[index].checked
    this.setCart(cartList)
  },

  //全选-反选
  handleChangeAllChecked(){
    let {allChecked,cartList} = this.data
    allChecked = !allChecked  //对全选状态取反
    cartList.forEach(v=>v.checked=allChecked)  //循环遍历商品数组，使每一个商品选中状态都和全选状态allChecked变化而变化
    this.setCart(cartList)
  },

  //结算
  handlePay(){
    //如果收货地址为空，提示请先选择收货地址
    let {address,totalNum} = this.data
    if(!address.userName){
      wx.showToast({
        title: '请先选择收货地址',
        icon: 'none',
      })
      return
    }
    //如果商品为空，提示请先选购商品
    if(totalNum === 0){
      wx.showToast({
        title: '请先选购商品',
        icon: 'none',
      })
      return
    }
    //否则跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
      success: (result) => {},
      fail: (res) => {},
      complete: (res) => {},
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
    //判断缓存中是否存在收货人地址
    const address = wx.getStorageSync('address')
    const cartList = wx.getStorageSync('cart')||[]
    //实现全选
    //const allChecked = cartList.length?cartList.every(v=>v.checked):false  //每一项都为true才返回true，只要有一项返回false就停止循环返回false  空数组时every方法就返回true
    this.cartListInfo = cartList
    this.setCart(cartList)
    this.setData({address})
  },

  //计算全选，总价格，总数量
  setCart(cartList){
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cartList.map((v,i)=>{
      if(v.checked){
        totalPrice += v.num*v.goods_price
        totalNum +=v.num
      }else{
        allChecked=false
      }
    })
    allChecked = cartList.length!=0?allChecked:false
    this.setData({
      cartList,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cartList)
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