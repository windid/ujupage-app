<script>
import API from '../../API'
import { Pagination } from 'element-ui'

export default {
  name: 'Leads',
  components: {
    [Pagination.name]: Pagination
  },
  data () {
    return {
      page: null,
      loading: true,
      leads: [],
      currentPage: 1,
      leadsCount: 0,
      pageSize: 50
    }
  },
  methods: {
    getLeads () {
      this.loading = true
      API.page.leads({ id: this.$route.params.pageId, current_page: this.currentPage, page_size: this.pageSize }).then(response => {
        this.leadsCount = response.data.total_pageforms
        this.leads = response.data.pageforms
        this.loading = false
      })
    },
    changeSize (size) {
      this.pageSize = size
      this.getLeads()
    },
    changeCurrentPage (page) {
      this.currentPage = page
      this.getLeads()
    },
    download () {
      window.location = '/api/page/' + this.$route.params.pageId + '/leadscvs'
    }
  },
  created () {
    API.page.get({ id: this.$route.params.pageId }).then(response => {
      this.page = response.data
      document.title = this.page.name + ' - 商机 - 聚页'
    })
    this.getLeads()
  }
}
</script>

<template>
<div>
  <div v-if="loading" class="loading">
    <div class="loading-icon"></div>
  </div>
  <div v-if="!loading" class="leads">
    <h1>商机列表 - {{page.name}} &nbsp; 
      <div class="btn btn-default" @click="download"><span class="glyphicon glyphicon-save"></span></div>
    </h1>
    <p v-if="leads.length === 0">该页面暂无表单提交数据</p>
    <table v-if="leads.length > 0" class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>表单数据</th>
          <th width="120px">版本</th>
          <th width="180px">提交时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads">
          <td>
            <p v-for="(value, key) in lead.fields">{{key}}: {{value}}</p>
          </td>
          <td>{{lead.variation_name}}</td>
          <td>{{lead.created_at}}</td>
        </tr>
      </tbody>
    </table>
    <el-pagination
      @size-change="changeSize"
      @current-change="changeCurrentPage"
      layout="total, sizes, prev, pager, next"
      :page-sizes="[20, 50, 100]"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="leadsCount">
    </el-pagination>
  </div>
</div>
</template>

<style scoped>
.leads {
  position: relative;
  top: 30px;
  width: 1000px;
  margin: 0 auto;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.leads h1 {
  font-size: 22px;
}

.leads > .el-pagination {
  text-align: right;
}
</style>