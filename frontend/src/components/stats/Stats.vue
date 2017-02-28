<script>
import API from '../../API'
import Navbar from './Navbar'
import Overview from './Overview'
import Conversion from './Conversion'
import Traffic from './Traffic'
import moment from '../../utils/date'

export default {
  name: 'Stats',
  components: {
    Navbar,
    Overview,
    Conversion,
    Traffic
  },
  data () {
    return {
      loading: false,
      report: {}
    }
  },
  computed: {
    params () {
      return {
        ...this.$route.params,
        ver: this.$route.query.ver || '',
        variation_id: this.$route.query.vid || 0,
        start_date: this.$route.query.sd || moment().add(-7, 'days').format('YYYY-MM-DD'),
        end_date: this.$route.query.ed || moment().add(-1, 'days').format('YYYY-MM-DD')
      }
    }
  },
  filters: {
    percentage (val) {
      return (Math.round(val * 1000) / 10) + '%'
    }
  },
  methods: {
    getReportData () {
      this.loading = true
      API.report.get(this.params).then(response => {
        this.report = response.data
        this.loading = false
      })
    }
  },
  mounted () {
    this.getReportData()
    document.title = this.$store.getters.statsPage.name + ' - 分析 - 聚页'
  },
  watch: {
    '$route': function () {
      this.getReportData()
    }
  }
}

</script>

<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="loading">
        <div class="loading">
          <div class="loading-icon"></div>
        </div>
      </div>
      <component v-if="!loading" :is="params.module" :report="report" :params="params"></component>
    </transition>
  </div>
</template>

<style>

.report td, .report th {
  line-height: 35px !important;
  text-align: center;
  word-break: break-all;
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