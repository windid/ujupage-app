<script>
import StatsNav from './StatsNav'
import moment from 'moment'
import { mapGetters } from 'vuex'
import Chart from './charts/Chart'
import { find } from 'lodash'

export default {
  components: {
    StatsNav,
    Chart
  },
  props: ['report', 'params'],
  filters: {
    percentage (val) {
      return (Math.round(val * 1000) / 10.0).toString() + '%'
    }
  },
  data () {
    return {
      currentTab: 'conversionRate'
    }
  },
  computed: {
    ...mapGetters({
      'page': 'statsPage'
    }),
    reportData () {
      const startDate = moment(this.params.start_date)
      const endDate = moment(this.params.end_date)
      const data = {
        conversions: {},
        conversionRate: {},
        visitors: {}
      }
      for (var i = 0; i <= endDate.diff(startDate, 'days'); i++) {
        const currentDate = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
        data['conversions'][currentDate] = {}
        data['conversionRate'][currentDate] = {}
        data['visitors'][currentDate] = {}
        if (this.report.variations) {
          this.report.variations.forEach(variation => {
            var variationData = variation.dates.find(d => d.report_date === currentDate)
            data['conversions'][currentDate][variation.name] = variationData ? variationData.total_conversions : 0
            data['conversionRate'][currentDate][variation.name] = (Math.round((variationData ? variationData.cv : 0) * 1000) / 10.0).toString() + '%'
            data['visitors'][currentDate][variation.name] = variationData ? variationData.total_visitors : 0
          })
          const totalData = this.report.gather_date.find(d => d.report_date === currentDate)
          data['conversions'][currentDate]['total'] = totalData ? totalData.total_conversions : 0
          data['conversionRate'][currentDate]['total'] = (Math.round((totalData ? totalData.cv : 0) * 1000) / 10.0).toString() + '%'
          data['visitors'][currentDate]['total'] = totalData ? totalData.total_visitors : 0
        }
      }
      return data
    },
    chartOptions () {
      return {
        scales: {
          yAxes: [{
            ticks: {
              callback: (value, index, values) => {
                return this.currentTab === 'conversionRate' ? value + '%' : value
              }
            }
          }]
        }
      }
    },
    dayLabels () {
      const startDate = moment(this.params.start_date)
      const endDate = moment(this.params.end_date)
      const labels = []
      for (var i = 0; i <= endDate.diff(startDate, 'days'); i++) {
        const currentDate = moment(startDate).add(i, 'days').format('YYYY-MM-DD')
        labels.push(currentDate)
      }
      return labels
    },
    chartData () {
      const data = {
        conversions: [],
        conversionRate: [],
        visitors: []
      }
      if (this.report.variations) {
        this.report.variations.forEach(variation => {
          const conversions = []
          const conversionRate = []
          const visitors = []
          this.dayLabels.forEach((day) => {
            const vd = find(variation.dates, { report_date: day }) || {
              total_conversions: 0,
              cv: 0,
              total_visitors: 0
            }
            conversions.push(parseFloat(vd.total_conversions))
            conversionRate.push(parseFloat((Math.round(vd.cv * 1000) / 10.0)))
            visitors.push(parseFloat(vd.total_visitors))
          })
          data.conversions.push({
            label: variation.name,
            data: conversions
          })
          data.conversionRate.push({
            label: variation.name,
            data: conversionRate
          })
          data.visitors.push({
            label: variation.name,
            data: visitors
          })
        })
      }
      return data
    }
  }
}

</script>

<template>
  <div>
    <stats-nav title="数据概览"></stats-nav>
    <div class="content-body">
      <table class="report table table-bordered table-hover">
        <thead>
          <tr>
            <th>版本</th>
            <th width="120px">转化率</th>
            <th width="120px">访客数</th>
            <th width="120px">转化次数</th>
            <th width="120px">流量分配</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="variation in report.variations">
            <td>{{variation.name}}</td>
            <td><strong>{{variation.cv | percentage}}</strong></td>
            <td>{{variation.total_visitors}}</td>
            <td>{{variation.total_conversions}}</td>
            <td>
              <div class="input-group">
                <input type="number" class="form-control" :value="variation.quota">
                <div class="input-group-addon">%</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="data-tab">
        <div class="btn-group">
          <div class="btn btn-default" :class="{ active: currentTab === 'conversionRate'}" @click="currentTab = 'conversionRate'">转化率</div>
          <div class="btn btn-default" :class="{ active: currentTab === 'conversions'}" @click="currentTab = 'conversions'">转化次数</div>
          <div class="btn btn-default" :class="{ active: currentTab === 'visitors'}" @click="currentTab = 'visitors'">访客数</div>
        </div>
      </div>
      <chart type="line" :labels="dayLabels" :datasets="chartData[currentTab]" :options="chartOptions"></chart>
      <table class="report table table-bordered table-hover">
        <thead>
          <tr>
            <th width="120px">时间</th>
            <th v-for="variation in report.variations">{{variation.name}}</th>
            <th>总计</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(variations, date) in reportData[currentTab]">
            <td>{{date}}</td>
            <td v-for="(data, name) in variations">{{data}}</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<style scoped>
.data-tab {
  text-align: right;
  margin: 10px 0;
}
</style>