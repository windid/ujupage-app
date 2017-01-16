<script>
import { DatePicker } from 'element-ui'
import Dropdown from '../ui/Dropdown'
import moment from 'moment'

export default {
  props: ['title'],
  components: {
    DatePicker,
    Dropdown
  },
  data () {
    return {
      duration: '',
      limitEndDate: moment().format('YYYY-MM-DD'),
      showVariations: false,
      page: this.$store.getters.statsPage,
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              const today = new Date()
              picker.$emit('pick', [today, today])
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [date, date])
            }
          },
          {
            text: '最近7天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ],
        disabledDate (d) {
          return moment(d).isAfter()
        }
      }
    }
  },
  methods: {
    pickDate (v) {
      console.log(v)
    },
    newQuery (key, value) {
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
    },
    switchVariation (variation) {
      variation = variation || { id: 0, name: '全部版本' }
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          'vid': variation.id
        }
      })
      this.showVariations = false
    }
  },
  computed: {
    variationName () {
      const variation = this.page.variations.filter(v => parseInt(v.id) === parseInt(this.$route.query.vid))[0]
      return variation ? variation.name : '全部版本'
    },
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
    },
    duration: {
      get () {
        return [this.date.startDate, this.date.endDate]
      },
      set (val) {
        this.date = {
          startDate: moment(val[0]).format('YYYY-MM-DD'),
          endDate: moment(val[1]).format('YYYY-MM-DD')
        }
      }
    },
    showDuration () {
      if (this.date.startDate === this.date.endDate) {
        return this.date.startDate
      }
      return this.date.startDate + ' 至 ' + this.date.endDate
    }
  }
}
</script>

<template>
<div>
  <div class="content-header">
    <h4>{{title}} - {{page.name}}</h4>
    <ul class="nav nav-pills" style="float: right">
      <router-link tag="li" active-class="active" :to="{ name: 'stats', params: { pageId: $route.params.pageId, module: 'overview'}, query: $route.query }"><a>数据概览</a></router-link>
      <router-link tag="li" active-class="active" :to="{ name: 'stats', params: { pageId: $route.params.pageId, module: 'conversion'}, query: $route.query }"><a>转化详情</a></router-link>
      <router-link tag="li" active-class="active" :to="{ name: 'stats', params: { pageId: $route.params.pageId, module: 'traffic'}, query: $route.query }"><a>流量来源</a></router-link>
    </ul>
  </div>
  <div class="data-filter">
    <div class="btn-group">
      <div class="btn btn-default" :class="{ active: !$route.query.ver }" @click="switchVersion('')">全部</div>
      <div class="btn btn-default" :class="{ active: $route.query.ver === 'pc' }" @click="switchVersion('pc')">桌面</div>
      <div class="btn btn-default" :class="{ active: $route.query.ver === 'mobile' }" @click="switchVersion('mobile')">移动</div>
    </div>
    <dropdown :show="showVariations" @toggle="showVariations=!showVariations">
      <div class="btn btn-default dropdown-toggle" data-toggle="dropdown">
        {{variationName}}
        &nbsp; <span class="glyphicon" :class="showVariations ? 'glyphicon-menu-up' : 'glyphicon-menu-down'"></span>
      </div>
      <ul slot="dropdown-menu" class="dropdown-menu">
        <li :class="{active: !$route.query.vid}"><a href="javascript:;" @click="switchVariation(null)">全部版本</a></li>
        <li v-for="variation in page.variations" :class="{active: $route.query.vid === variation.id}"><a href="javascript:;" @click="switchVariation(variation)">{{variation.name}}</a></li>
      </ul>
    </dropdown>
    <!-- <date-picker v-model="date" :limit-end-date="limitEndDate" position="right"></date-picker> -->
    <div class="date-picker-wrap btn-group btn btn-default dropdown-toggle" data-toggle="dropdown">
      <div>
        <span>{{ showDuration }}</span>
         &nbsp; <span class="glyphicon" :class="'glyphicon-menu-down'"></span>
      </div>
      <date-picker
        :editable="false"
        class="date-picker"
        v-model="duration"
        type="daterange"
        align="right"
        placeholder="请输入日期"
        :picker-options="pickerOptions">
        <div class="">efegegrege</div>
      </date-picker>
    </div>
    
  </div>
</div>
</template>

<style lang="scss">
.date-picker-wrap.btn {
  position: relative;
  .date-picker {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0;
    input {
      cursor: inherit;
      padding: 0;
      height: 100%;
    }
    .el-icon {
      display: none;
    }
  }
}

</style>
<style lang="scss" scoped>
.data-filter {
  border-bottom: 1px solid #e9e9e9;
  padding: 10px 20px;
  text-align: right;
}

.data-filter > .btn-group {
  margin-left: 12px;
}
</style>