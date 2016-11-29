<script>
import Dropdown from '../ui/Dropdown'
import { merge, isEqual } from 'lodash'

export default {
  components: {
    Dropdown
  },
  props: {
    value: {
      required: true
    }
  },
  data () {
    return {
      show: false,
      element: {
        fixed: !!this.value.fixed,
        fixedPosition: this.value.fixedPosition || 'top',
        fixedScroll: this.value.fixedScroll || false,
        fixedScrollPx: this.value.fixedScrollPx || 0
      }
    }
  },
  computed: {
    fixedSetting: {
      get () {
        return this.element.fixed ? this.element.fixedPosition : 'none'
      },
      set (val) {
        this.element.fixed = (val !== 'none')
        this.element.fixedPosition = val
      }
    }
  },
  methods: {
    editDone () {
      if (!isEqual(this.originalElement, this.element)) {
        this.$emit('input', merge({}, this.value, this.element))
      }
      this.show = false
    }
  },
  mounted () {
    this.originalElement = merge({}, this.element)
  }
}
</script>

<template>
  <dropdown :show="show" @toggle="show=!show">
    <div class="btn btn-default dropdown-toggle" data-toggle="dropdown" title="固定位置"><span class="glyphicon glyphicon-pushpin"></span> </div>
    <ul slot="dropdown-menu" class="dropdown-menu">
      <li><label><input type="radio" name="fixed" value="none" v-model="fixedSetting"> 定位在板块中</label></li>
      <li><label><input type="radio" name="fixed" value="top" v-model="fixedSetting"> 固定到浏览器顶部</label></li>
      <li><label><input type="radio" name="fixed" value="bottom" v-model="fixedSetting"> 固定的浏览器底部</label></li>
      <template v-if="element.fixed">
        <li role="separator" class="divider"></li>
        <li><label><input type="radio" name="fixed-scroll" :value="false" v-model="element.fixedScroll"> 一直出现</label></li>
        <li><label><input type="radio" name="fixed-scroll" :value="true" v-model="element.fixedScroll"> 页面向下滚动时出现</label></li>
        <template v-if="element.fixedScroll">
          <li role="separator" class="divider"></li>
          <li><label>滚动到多少像素出现？</label></li>
          <li><label>
            <div class="input-group">
              <input type="text" class="form-control" v-model="element.fixedScrollPx">
              <div class="input-group-addon">像素</div>
            </div>
          </label></li>
        </template>
      </template>
      <li><label><div class="btn btn-sm btn-success" @click="editDone">确定</div></label></li>
    </ul>
  </dropdown>
</template>

<style scoped>
.dropdown-menu > li > label{
  padding: 6px;
}
</style>