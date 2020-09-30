let ajaxTimes = 0  //同时发送请求的次数
export const request=(params)=>{
    ajaxTimes++; //每调用一次加一次
    //发送请求前显示加载中
    wx.showLoading({
      title: '数据加载中',
      mask:true
    })
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve,reject)=>{
         wx.request({
            ...params,//解构出所传递过来的所有参数
            url:baseUrl+params.url,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            },
            //请求结束后关闭loading
            complete:() => {
                ajaxTimes--;  //每完成一个减一次
                if(ajaxTimes===0){  //当次数为0时，关闭等待
                    wx.hideLoading()
                }
               
            }
        }); 
    })
}