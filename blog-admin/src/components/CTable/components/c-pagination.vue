<template>
  <div>
    <el-pagination
      :style="{'text-align': textAlign, 'margin-top': '10px'}"
      background
      :small="small"
      :size="size"
      :layout="layout"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      v-bind="paginationProps"
      @prev-click="handlePrevClick"
      @next-click="handleNextClick"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
/**
@description: 分页组件
@createTime:2021-12-09
@create:lijiahui
*/
export default {
  name: 'c-pagination',
  inheritAttrs: false,
  props: {
    textAlign: {
      type: String,
      default: 'center'
    },
    small: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'mini'
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40, 50, 100]
      }
    }
  },
  components: {},
  data() {
    return {
      // 默认当前页面
      pNum: 1,
      // 默认一页十条
      pSize: 10,
      // 分页的所有属性
      paginationProps: {}
    };
  },
  computed: {},
  watch: {
    $attrs: {
      immediate: true,
      deep: true,
      handler({ total, currnetPage, pageSize }) {
        const props = Object.assign({}, { total, currnetPage, pageSize });
        this.paginationProps = props;
        if (typeof total === 'string') {
          this.paginationProps.total = Number(total);
        }
        this.pNum = currnetPage;
        this.pageSize = pageSize;
      }
    }
  },
  mounted() {},
  created() {
    const { $attrs } = this;
    this.pNum = $attrs.currnetPage;
    this.pSize = $attrs.pageSize;
  },
  methods: {
    // 每页条数发生的改变
    handleSizeChange(pageSize) {
      this.pSize = pageSize;
      this.$emit('size-change', pageSize);
      this.$emit('update:pageSize', pageSize);
      if (this.pNum > Math.ceil(this.paginationProps.total / pageSize)) return
      this.pageChange();
    },
    // 修改当前页码
    handleCurrentChange(currentPage) {
      this.pNum = currentPage;
      this.$emit('current-change', pageSize);
      this.$emit('update:currentPage', pageSize);
      this.pageChange();
    },
    // 上一页
    handlePrevClick(pageNum) {
      this.$emit('prev-click', pageNum);
    },
    // 下一页
    handleNextClick(pageNum) {
      this.$emit('next-click', pageNum);
    },
    pageChange() {
      this.$emit('page-change', this.pNum, this.pSize);
    }
  }
};
</script>
<style scoped></style>

