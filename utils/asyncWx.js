// promise形式的微信登录
export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 10000,
      success: (result) =>{
        resolve(result)
      },
      fail :(err)=>{
        reject(err)
      }
    })
  })
}

// promise形式的微信支付
export const requestPayment=(pay)=>{
  return new Promise((resolve,reject)=>{
   wx-wx.requestPayment({
     ...pay,
     success: (res) => {
       resolve(res)
     },
     fail: (err) => {
       reject(err)
     },
   })
  })
}