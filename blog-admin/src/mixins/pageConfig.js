/*
 * @Description: 通用的页面配置
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-12-09 16:20:17
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-09 16:24:18
 */
const pageMixin = {
  data() {
    return {
      pageConfig: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    }
  }
}

export default pageMixin
