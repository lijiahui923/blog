import Vue from "vue";
import backTop from "./back-top";

const install = function(Vue) {
    Vue.directive('back-top', backTop)
}

if (window.Vue) {
    window.backTop = backTop;
    Vue.use(install)
}
backTop.install = install
export default backTop