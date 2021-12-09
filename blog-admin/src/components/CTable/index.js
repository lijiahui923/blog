/*
 * @Description: 表格组件
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-12-09 10:54:51
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-09 14:34:34
 */
import CTable from './src/index.vue';

CTable.install = function(Vue) {
  Vue.component(CTable.name, CTable)
}

export default CTable
