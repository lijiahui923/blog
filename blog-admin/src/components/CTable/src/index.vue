<script>
import methods from '../mixins/table-methods'
import CPagination from '../components/c-pagination.vue'
/**
@description:封装el-table表格
@createTime:2021-12-09
@create:lijiahui
*/
const defaultColumnsProps = {
  'show-overflow-tooltip': true,
  'min-width': 100
}
export default {
  name: 'CTable',
  components: { CPagination },
  mixins: [methods],
  props: {
    columns: {
      type: Array,
      default: () => [],
      require: true
    },
    data: {
      type: Array,
      default: () => [],
      require: true
    },
    pageConfig: {
      type: Object,
      default: () => {}
    },
    columnsConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      elTableRef: 'EL_TABLE_REF'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {},
  methods: {
    // 渲染表格
    renderTable(h) {
      const { $attrs, $listeners } = this
      const columns = this.renderColumns(h)
      const props = Object.assign({}, $attrs, { data: this.data })
      return h(
        'el-table',
        {
          props,
          on: $listeners,
          ref: this.elTableRef
        },
        [...columns]
      )
    },
    // 所有的列
    renderColumns(h) {
      const columns = []
      this.columns.forEach(column => {
        if (column.type === 'operate') {
          columns.push(this.renderOperateColumn(h, column))
        } else if (column.type === 'expand') {
          console.log('expand')
        } else {
          columns.push(this.renderColumn(h, column))
        }
      })
      return columns
    },
    // 渲染单个列
    renderColumn(h, column) {
      // 合并列的默认配置
      const _column = Object.assign(column, defaultColumnsProps, this.columnsConfig)
      // 单个
      const defalutScopedSlots = {}
      // 多个
      const scopedSlotsList = []
      // 列的作用域插槽和头部插槽
      // 是对象的话说明有两个插槽一个列里面的插槽一个头部的插槽，一个就是一个列配置的插槽
      if (typeof _column.slots === 'object') {
        for (const key in _column.slots) {
          const currnetSlotName = this.$scopedSlots[_column.slots[key]]
          scopedSlotsList[key] = props => {
            return currnetSlotName(props)
          }
        }
      } else {
        const currnetSlotName = this.$scopedSlots[_column.slots]
        defalutScopedSlots.default = props => {
          return currnetSlotName(props)
        }
      }
      return h(
        'el-table-column',
        {
          props: _column,
          scopedSlots: _column.slots && Object.assign({}, defalutScopedSlots, scopedSlotsList)
        }
      )
    },
    // 渲染分页
    renderPage(h) {
      if (this.pageConfig) {
        return h(
          'CPagination',
          {
            attrs: this.pageConfig,
            on: this.$listeners
          }
        )
      }
    }
  },
  render(h) {
    return h(
      'div',
      [
        this.renderTable(h),
        this.renderPage(h)
      ]
    )
  }
}
</script>
<style scoped></style>
