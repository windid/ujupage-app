<script>
import StatsNav from './StatsNav'

export default {
  components: {
    StatsNav
  },
  props: ['report'],
  filters: {
    percentage (val) {
      return (Math.round(val * 1000) / 10.0).toString() + '%'
    }
  }
}

</script>

<template>
  <div>
    <stats-nav title="数据概览"></stats-nav>
    <div class="stats-content">
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
                <input type="number" class="form-control">
                <div class="input-group-addon">%</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <div class="btn-group">
          <div class="btn btn-default">转化率</div>
          <div class="btn btn-default">访客数</div>
        </div>
      </div>

      <table class="report table table-bordered table-hover">
        <thead>
          <tr>
            <th width="120px">时间</th>
            <th v-for="variation in report.variations">{{variation.name}}</th>
            <th>总计</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2016-09-20</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>2016-09-21</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<style>
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


</style>