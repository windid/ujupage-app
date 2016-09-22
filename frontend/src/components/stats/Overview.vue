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
    <stats-nav title="数据概览"></stats-nav>
    <div class="stats-content">
      <table class="variations table table-bordered table-hover">
        <thead>
          <tr>
            <th>版本</th>
            <th width="120px">转化率</th>
            <th width="120px">访客数</th>
            <th width="120px">转化次数</th>
            <th width="110px">流量分配</th>
            <!-- <th width="100px">操作</th> -->
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>版本 A</td>
            <td><strong>10.2%</strong></td>
            <td>1312222</td>
            <td>1322</td>
            <td>
              <div class="input-group">
                <input type="text" class="form-control">
                <div class="input-group-addon">%</div>
              </div>
            </td>
            <!-- <td>1</td> -->
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

.variations td, .variations th {
  line-height: 35px !important;
  text-align: center;
}

.variations th {
  background: #eee;
  border-bottom-width: 1px !important;
  text-align: center;
}

.variations td:first-child, .variations th:first-child {
  text-align: left;
}


</style>