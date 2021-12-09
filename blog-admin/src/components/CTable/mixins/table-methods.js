/*
 * @Description:el-table Methods
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-12-09 11:14:08
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-09 11:19:16
 */

const METHODS_NAMES = [
  'clearSelection',
  'toggleRowSelection',
  'toggleAllSelection',
  'toggleRowExpansion',
  'setCurrentRow',
  'clearSort',
  'clearFilter',
  'doLayout',
  'sort'
]

const methods = {}
METHODS_NAMES.forEach(name => {
  methods[name] = function (...args) {
    const ref_table = this.$refs[this.elTableRef]
    if (ref_table && ref_table[name]) {
      ref_table[name](...args)
    }
  }
})

export default { methods }
