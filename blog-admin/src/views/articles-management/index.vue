<template>
  <div>
    <c-table
      :columns="columns"
      :data="articleData"
      :page-config="pageConfig"
    >
    <template v-slot:image="{ row }">
      <img :src="row.image"  alt="" />
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
  name: 'ArticlesManagement',
  components: {},
  mixins: [pageMixin],
  props: {},
  data() {
    return {
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
    }
  }
}
</script>
<style scoped></style>
