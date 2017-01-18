<script>
import DateRangePicker from '../ui/DateRangePicker'
import Dropdown from '../ui/Dropdown'
import moment from '../../utils/date'

export default {
  props: ['title'],
  components: {
    DateRangePicker,
    Dropdown
  },
  data () {
    return {
      duration: '',
      limitEndDate: moment().format('YYYY-MM-DD'),
      showVariations: false,
      page: this.$store.getters.statsPage
    }
  },
  methods: {
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
    <date-range-picker v-model="date"></date-range-picker> 
  </div>
</div>
</template>

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