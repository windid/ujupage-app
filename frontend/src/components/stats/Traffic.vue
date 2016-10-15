<script>
import StatsNav from './StatsNav'

export default {
  components: {
    StatsNav
  }
}

</script>
<template>
  <div>
    <stats-nav title="流量分析"></stats-nav>
    <div class="stats-content">
      <ul class="nav nav-tabs" role="tablist">
        <li><a href="#">广告系列</a></li>
        <li class="active"><a href="#">来源</a></li>
        <li><a href="#">媒介</a></li>
        <li><a href="#">来源 / 媒介</a></li>
        <li><a href="#">广告内容</a></li>
        <li><a href="#">关键词</a></li>
      </ul>
      <div class="traffic-content">
        <table class="report table table-bordered table-hover">
          <thead>
            <tr>
              <th>来源</th>
              <th width="120px">转化率</th>
              <th width="120px">转化次数</th>
              <th width="120px">访客数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>sdf</td>
              <td>sdf</td>
              <td>sdf</td>
              <td>sdf</td>
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