<script>
import StatsNav from './StatsNav'
export default {
  components: {
    StatsNav
  },
  props: ['report'],
  filters: {
    percentage (val) {
      return (Math.round(val * 10) / 10.0).toString() + '%'
    }
  },
  computed: {
    goalData () {
      return this.report[1]
    },
    notGoalData () {
      return this.report[0]
    }
  }
}
</script>

<template>
  <div>
    <stats-nav title="转化详情"></stats-nav>
    <div class="content-body">
      <h4>转化事件</h4>
      <table v-if="goalData && goalData.length > 0" class="report table table-bordered table-hover">
        <thead>
          <tr>
            <th width="120px">转化类型</th>
            <th>转化目标</th>
            <th width="120px">转化次数</th>
            <th width="120px">转化率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="goal in goalData">
            <td>{{goal.goal_type}}</td>
            <td>{{goal.goal_desc}}</td>
            <td>{{goal.goals}}</td>
            <td>{{goal.goals_percent | percentage}}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="text-warning">报告期内没有转化数据。</p>

      <template v-if="notGoalData && notGoalData.length > 0">
        <h4>非转化事件<span class="title-remark">(未被定义为转化的用户交互行为)</span></h4>
        <table class="report table table-bordered table-hover">
          <thead>
            <tr>
              <th width="120px">事件类型</th>
              <th>事件描述</th>
              <th width="120px">发生次数</th>
              <th width="120px">发生率</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="goal in notGoalData">
              <td>{{goal.goal_type}}</td>
              <td>{{goal.goal_desc}}</td>
              <td>{{goal.goals}}</td>
              <td>{{goal.goals_percent | percentage}}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>