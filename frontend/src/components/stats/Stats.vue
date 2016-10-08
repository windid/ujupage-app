<script>
import AppHeader from '../common/AppHeader'
import API from '../../API'
import Navbar from './Navbar'
import Overview from './Overview'
import Conversion from './Conversion'
import Campaign from './Campaign'
import moment from 'moment'

export default {
  name: 'Stats',
  components: {
    AppHeader,
    Navbar,
    Overview,
    Conversion,
    Campaign
  },
  data () {
    return {
      loading: false,
      report: {}
    }
  },
  methods: {
    getReportData () {
      const params = {
        ...this.$route.params,
        ver: this.$route.query.ver,
        start_date: this.$route.query.sd || moment().add(-7, 'days').format('YYYY-MM-DD'),
        end_date: this.$route.query.ed || moment().add(-1, 'days').format('YYYY-MM-DD')
      }
      this.loading = true
      API.report.get(params).then(response => {
        this.report = response.data
        this.loading = false
      })
    }
  },
  mounted () {
    // this.getReportData()
  },
  watch: {
    '$route': function () {
      // this.getReportData()
    }
  }
}

</script>

<template>
  <div>
    <navbar></navbar>
    <transition name="fade" mode="out-in">
      <div v-if="loading" class="workspace">
        <div class="loading">
          <div class="loading-icon"></div>
        </div>
      </div>
      <component v-else :is="$route.params.module" :report="report" class="workspace"></component>
    </transition>
  </div>
</template>

<style>
.workspace{
  position:relative;
  height:100%;
  margin-left:240px;
}

.stats-content {
  padding: 15px;
}

.report td, .report th {
  line-height: 35px !important;
  text-align: center;
}

.report th {
  background: #eee;
  border-bottom-width: 1px !important;
  text-align: center;
}

.report td:first-child, .report th:first-child {
  text-align: left;
}

.title-remark {
  padding: 10px;
  font-size: 12px;
  color: #aaa;
}
</style>