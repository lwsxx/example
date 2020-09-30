// components/Tabs/tabs.js
Component({
  /**
   * 组件的属性列表 父向子传递
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    chooseId:0

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTab(e){
      
      const {index} = e.currentTarget.dataset  //获取索引

      //子组件内循环修改 
      // 获取原数组
      // 对数组循环
            // 给每一个循环性 选中属性 改为 false
            // 给当前的索引的 项 添加激活选中效果
      // let {tabs} = this.data  // 获取原数组
      // // 循环数组  forEach遍历数组 遍历数组的时候 修改了 v，也会导致源数组被修改
      // tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
      // this.setData({
      //   tabs
      // })

      //点击事件触发的时候，触发父组件中的自定义事件 同时传递数据给 父组件  
      //this.triggerEvent("父组件自定义事件的名称"，要传递的参数)
      this.triggerEvent("itemChange",{index})


    }
  }
})
