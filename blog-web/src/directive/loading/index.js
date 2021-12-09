// import load from './load';
import loading from './loading';
export default {
  install(Vue) {
    // Vue.directive("load", load), 	  // 局部load
    Vue.directive("loading", loading) // 全局loading
  }
}