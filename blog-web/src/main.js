/*
 * @Description: 
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-11-25 11:01:44
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-22 13:52:22
 */
import Vue from 'vue'
import '@/assets/style/reset.css'
import '@/assets/style/iconfont/iconfont.css'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './registerServiceWorker'

// import loading from './directive/loading' 

//全局过滤器
import * as filters from './filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

//全局方法
import * as utils from './utils'
Object.keys(utils).forEach(key => {
	Vue.prototype[key] = utils[key]
})


//better-scroll 平滑滚动
// import Scroller from '@/components/Scroller'
// Vue.component('Scroller',Scroller)

//Loading
import Loading from '@/components/Loading.vue'

// import './registerServiceWorker'
// Vue.component('Loading',Loading)
// Vue.use(loading);
Vue.config.productionTip = false

//控制台
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

// store.dispatch('UserInfo/fetchDatas')


//微信分享
// import { commonShare } from '@/api/Share'
// commonShare(this,"沙小光的成长笔记",window.location.href,"http://wx3.sinaimg.cn/mw690/006ZNE4cgy1gimo8xkzs8j316t0u07uu.jpg","记录成长路上的点点滴滴");
let vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')