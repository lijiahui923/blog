import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};
const routes = [
  {
      path: '/',
      name: 'Home',
      component: ()=> import('@/views/home/index.vue')
  },
  {
      path: '/detail/:id',
      name: 'Detail',
      component: ()=> import('@/views/detail.vue')
  },
  // {
  //     path:'*',
  //     name:'NotFound',
  //     component: ()=> import('@/views/NotFound.vue'),
  //     meta:{
  //       keepAlive: true 
  //     }
  // }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
