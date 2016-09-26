<script>
import DatePicker from '../ui/DatePicker'
export default {
  props: ['title'],
  components: {
    DatePicker
  },
  data () {
    return {
      date: ''
    }
  }
}
</script>

<template>
  <div class="stats-nav">
    <h1>{{title}}</h1>
    <div class="data-filter">
      <div class="btn-group">
        <div class="btn btn-default">全部</div>
        <div class="btn btn-default">桌面</div>
        <div class="btn btn-default">移动</div>
      </div>
      <date-picker v-model="date" limit-start-date="2016/05/07" limit-end-date="2016/09/01" position="right"></date-picker>
    </div>
  </div>
</template>

<style scoped>
.stats-nav {
  padding:15px;
  height: 60px;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 0 8px #eee;
}

.stats-nav h1 {
  font-size: 22px;
  padding: 5px 0;
  margin: 0;
  float: left;
}

.data-filter {
  float: right;
}
</style>