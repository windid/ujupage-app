<script>
import StatsNav from './StatsNav'

export default {
  components: {
    StatsNav
  },
  props: ['report'],
  filters: {
    percentage (val) {
      return (Math.round(val * 1000) / 10) + '%'
    }
  },
  data () {
    return {
      tabs: {
        'utm_campaign': '广告系列',
        'utm_source': '来源',
        'utm_medium': '媒介',
        'utm_content': '广告内容',
        'utm_term': '关键词'
      },
      currentTab: 'utm_campaign'
    }
  }
}

</script>
<template>
  <div>
    <stats-nav title="流量来源"></stats-nav>
    <div class="content-body">
      <ul class="nav nav-tabs" role="tablist">
        <li v-for="(tabName, tab) in tabs" :class="{ active: tab === currentTab }"><a href="javascript:;" @click="currentTab = tab">{{tabName}}</a></li>
      </ul>
      <div class="traffic-content">
        <table class="report table table-bordered table-hover">
          <thead>
            <tr>
              <th>{{tabs[currentTab]}}</th>
              <th width="120px">转化率</th>
              <th width="120px">转化次数</th>
              <th width="120px">访客数</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="rowData in report[currentTab]">
              <td>{{rowData.dimension_value || '未设置'}}</td>
              <td>{{rowData.conversion_percent | percentage}}</td>
              <td>{{rowData.conversions}}</td>
              <td>{{rowData.visitors}}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<style>
.traffic-content {
  border: 1px solid #ddd;
  border-top: 0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 10px;
}
</style>