/*
 * @Description: 组件初始化
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-12-09 14:34:51
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-09 15:39:12
 */
import CTable from './CTable/index'

const components = [
  CTable
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  install
}
