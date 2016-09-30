<script>
import DatePicker from '../ui/DatePicker'
import moment from 'moment'

export default {
  props: ['title'],
  components: {
    DatePicker
  },
  data () {
    return {
      limitEndDate: moment().format('YYYY-MM-DD')
    }
  },
  methods: {
    newQuery (key, value) {
      console.log(this.$route, key)
      return {
        ...this.$route.query,
        [key]: value
      }
    },
    switchVersion (ver) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          'ver': ver
        }
      })
    }
  },
  computed: {
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
  }
}
</script>

<template>
  <div class="stats-nav">
    <h1>{{title}}</h1>
    <div class="data-filter">
      <div class="btn-group">
        <div class="btn btn-default" :class="{ active: !$route.query.ver }" @click="switchVersion('')">全部</div>
        <div class="btn btn-default" :class="{ active: $route.query.ver === 'pc' }" @click="switchVersion('pc')">桌面</div>
        <div class="btn btn-default" :class="{ active: $route.query.ver === 'mobile' }" @click="switchVersion('mobile')">移动</div>
      </div>
      <date-picker v-model="date" :limit-end-date="limitEndDate" position="right"></date-picker>
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