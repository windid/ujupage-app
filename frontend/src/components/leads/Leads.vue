<script>
import API from '../../API'
import { Pagination } from 'element-ui'
import DatePicker from '../ui/DatePicker'
import moment from 'moment'
import Dropdown from '../ui/Dropdown'

export default {
  name: 'Leads',
  components: {
    [Pagination.name]: Pagination,
    DatePicker,
    Dropdown
  },
  data () {
    return {
      page: { name: '' },
      loading: true,
      leads: [],
      currentPage: 1,
      leadsCount: 0,
      pageSize: 50,
      limitEndDate: moment().format('YYYY-MM-DD'),
      hideFieldName: false,
      fieldsDropdown: false,
      utmsDropdown: false,
      utmMap: {
        'utm_source': {
          name: '来源',
          display: true
        },
        'utm_campaign': {
          name: '广告计划',
          display: false
        },
        'utm_medium': {
          name: '媒体',
          display: false
        },
        'utm_content': {
          name: '广告内容',
          display: false
        },
        'utm_term': {
          name: '关键词',
          display: false
        }
      }
    }
  },
  computed: {
    utmDisplayAll: {
      get () {
        for (const utmKey in this.utmMap) {
          if (!this.utmMap[utmKey].display) {
            return false
          }
        }
        return true
      },
      set (val) {
        for (const utmKey in this.utmMap) {
          this.utmMap[utmKey].display = val
        }
      }
    },
    date: {
      get () {
        return {
          startDate: this.$route.query.sd || moment().add(-7, 'days').format('YYYY-MM-DD'),
          endDate: this.$route.query.ed || moment().add(-1, 'days').format('YYYY-MM-DD')
        }
      },
      set (val) {
        const query = {
          ...this.$route.query,
          'sd': val.startDate,
          'ed': val.endDate
        }
        this.$router.push({
          path: this.$route.path,
          query: query
        })
      }
    }
  },
  methods: {
    getLeads () {
      this.loading = true
      API.page.leads({
        id: this.$route.params.pageId,
        current_page: this.currentPage,
        page_size: this.pageSize,
        start_date: this.date.startDate,
        end_date: this.date.endDate
      }).then(response => {
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
      window.location = '/api/page/' + this.$route.params.pageId + '/leadscvs?start_date=' + this.date.startDate + '&end_date=' + this.date.endDate
    }
  },
  created () {
    API.page.get({ id: this.$route.params.pageId }).then(response => {
      this.page = response.data
      document.title = this.page.name + ' - 商机 - 聚页'
    })
    this.getLeads()
  },
  watch: {
    '$route': function () {
      this.getLeads()
    }
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
      <date-picker style="float:right;" v-model="date" :limit-end-date="limitEndDate" position="right"></date-picker>
    </h1>
    <p v-if="leads.length === 0">该页面暂无表单提交数据</p>
    <table v-if="leads.length > 0" class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>表单数据
            <dropdown :show="fieldsDropdown" @toggle="fieldsDropdown=!fieldsDropdown">
              <div class="btn btn-sm btn-defualt dropdown-toggle" data-toggle="dropdown">
                <span class="glyphicon glyphicon-cog"></span>
              </div>
              <div slot="dropdown-menu" class="dropdown-menu">
                <div class="dropdown-item" @click="hideFieldName = !hideFieldName">
                  <span class="glyphicon" :class="hideFieldName ? 'glyphicon-ok' : 'glyphicon-unchecked'"></span> 隐藏字段名
                </div>
              </div>
            </dropdown>
            <!-- <label class="toggle-field-name"><input type="checkbox" v-model="hideFieldName"> 隐藏字段名</label> -->
          </th>
          <th width="220px">来源标记
            <dropdown :show="utmsDropdown" @toggle="utmsDropdown = !utmsDropdown">
              <div class="btn btn-sm btn-defualt dropdown-toggle" data-toggle="dropdown">
                <span class="glyphicon glyphicon-cog"></span>
              </div>
              <ul slot="dropdown-menu" class="dropdown-menu">
                <li class="dropdown-item" @click="utmDisplayAll = !utmDisplayAll">
                  <span class="glyphicon" :class="utmDisplayAll ? 'glyphicon-ok' : 'glyphicon-unchecked'"></span> 全部
                </li>
                <li role="presentation" class="divider"></li>
                <li v-for="(utm, utmKey) in utmMap" class="dropdown-item" @click="utm.display = !utm.display">
                  <span class="glyphicon" :class="utm.display ? 'glyphicon-ok' : 'glyphicon-unchecked'"></span> {{utm.name}}
                </li>
              </ul>
            </dropdown>
          </th>
          <th width="100px">版本</th>
          <th width="160px">提交时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads">
          <td>
            <p v-for="(value, key) in lead.fields"><span v-if="!hideFieldName">{{key}}: </span>{{value}}</p>
          </td>
          <td>
            <p v-for="(value, key) in lead.utms" v-if="utmMap[key].display">{{utmMap[key].name}}: {{value}}</p>
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

.toggle-field-name {
  float: right;
  color: #999;
  cursor: pointer;
}

.dropdown-item {
  padding: 5px;
  font-weight: normal;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f6f6f6;
}
</style>