<template>
  <div class="page-container">
    <div class="page-top-operate">
      <div class="operate-left">
        <el-button @click="handleOperate('add')">新增</el-button>
      </div>
      <div class="operate-right">
        <el-input class="operate-right-input" v-model="search"></el-input>
        <el-button>搜索</el-button>
      </div>
    </div>
    <c-table
      :columns="columns"
      :data="articleData"
      :page-config="pageConfig"
    >
      <template v-slot:image="{ row }">
        <img alt="" :src="row.image">
      </template>
    </c-table>
  </div>
</template>

<script>
/**
@description:文章管理页面
@createTime:2021-12-09
@create:lijiahui
*/
import { fetchList } from '@/api/article'
import pageMixin from '@/mixins/pageConfig'
export default {
  name: 'list',
  components: {},
  mixins: [pageMixin],
  props: {},
  data() {
    return {
      search: '',
      articleData: [],
      columns: [
        {
          prop: 'title',
          label: 'title'
        },
        {
          prop: 'image',
          label: 'image',
          slots: 'image'
        },
        {
          prop: 'classify',
          label: 'classify'
        },
        {
          prop: 'content',
          label: 'content'
        },
        {
          prop: 'summary',
          label: 'summary'
        },
        {
          prop: 'tag',
          label: 'tag'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await fetchList()
      this.articleData = data.rows
      this.pageConfig.total = data.count
    },
    handleOperate(flag) {
      this.$router.push('/articles-management/articleOperate')
    }
  }
}
</script>
<style scoped>
.page-top-operate {
    display: flex;
    margin: 4px 0 10px;
}
.operate-left {
    width: 50%;
}
.operate-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
}
.operate-right-input.el-input.el-input--mini {
    width: 50%;
    margin-right: 10px;
}
</style>
