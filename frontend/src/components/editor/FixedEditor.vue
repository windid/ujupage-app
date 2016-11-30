<script>
import Sidebar from '../ui/Sidebar'
import { merge, isEqual } from 'lodash'

export default {
  components: {
    Sidebar
  },
  props: {
    value: {
      required: true
    },
    show: {
      required: true
    }
  },
  data () {
    return {
      element: {
        fixed: !!this.value.fixed,
        fixedPosition: this.value.fixedPosition ? { ...this.value.fixedPosition } : { top: 'auto', bottom: '0', left: '0', right: 'auto' },
        fixedScrollPx: this.value.fixedScrollPx || 0
      }
    }
  },
  computed: {
    fixedTop: {
      get () {
        return this.element.fixedPosition.top === 'auto' ? '' : parseInt(this.element.fixedPosition.top)
      },
      set (val) {
        if (val === '') {
          this.element.fixedPosition.top = 'auto'
        } else {
          this.element.fixedPosition.top = val + 'px'
          this.element.fixedPosition.bottom = 'auto'
        }
      }
    },
    fixedBottom: {
      get () {
        return this.element.fixedPosition.bottom === 'auto' ? '' : parseInt(this.element.fixedPosition.bottom)
      },
      set (val) {
        if (val === '') {
          this.element.fixedPosition.bottom = 'auto'
        } else {
          this.element.fixedPosition.bottom = val + 'px'
          this.element.fixedPosition.top = 'auto'
        }
      }
    },
    fixedLeft: {
      get () {
        return this.element.fixedPosition.left === 'auto' ? '' : parseInt(this.element.fixedPosition.left)
      },
      set (val) {
        if (val === '') {
          this.element.fixedPosition.left = 'auto'
        } else {
          this.element.fixedPosition.left = val + 'px'
          this.element.fixedPosition.right = 'auto'
        }
      }
    },
    fixedRight: {
      get () {
        return this.element.fixedPosition.right === 'auto' ? '' : parseInt(this.element.fixedPosition.right)
      },
      set (val) {
        if (val === '') {
          this.element.fixedPosition.right = 'auto'
        } else {
          this.element.fixedPosition.right = val + 'px'
          this.element.fixedPosition.left = 'auto'
        }
      }
    }
  },
  methods: {
    editDone () {
      if (!isEqual(this.originalElement, this.element)) {
        this.$emit('input', merge({}, this.value, this.element))
      } else {
        this.$emit('input', false)
      }
    }
  },
  mounted () {
    this.originalElement = merge({}, this.element)
  }
}
</script>

<template>
  <sidebar v-if="show" :show="show" @close="editDone">
    <div slot="header">
      <div class="btn btn-success" @click="editDone">完成</div>
    </div>
    <div slot="body">
      <div class="sidebar-block">
        <label><input type="checkbox" v-model="element.fixed"> 使用固定定位</label>
        <div class="fixed-hint">* 将该组件固定在浏览器窗口的指定位置上</div>
      </div>
      <div v-show="element.fixed" class="sidebar-block">
        <div>浏览器窗口位置</div>
        <div>
          <div>
            <div class="input-group position-input">
              <div class="input-group-addon" @click="fixedTop = 0">顶部</div>
              <input style="text-align:center;" type="number" class="form-control" placeholder="自动" v-model="fixedTop">
            </div>
          </div>
          
          <div style="clear:both">
            <div class="input-group position-input" style="float: left">
              <div class="input-group-addon" @click="fixedLeft = 0">左边距</div>
              <input style="text-align:center;" type="number" class="form-control" placeholder="自动" v-model="fixedLeft">
            </div>
            <div class="input-group position-input" style="float: right">
              <div class="input-group-addon" @click="fixedRight = 0">右边距</div>
              <input style="text-align:center;" type="number" class="form-control" placeholder="自动" v-model="fixedRight">
            </div>
          </div>
          
          <div class="input-group position-input">
            <div class="input-group-addon" @click="fixedBottom = 0">底部</div>
            <input style="text-align:center;" type="number" class="form-control" placeholder="自动" v-model="fixedBottom">
          </div>
        </div>
      </div>
      <div v-show="element.fixed" class="sidebar-block">
        <div class="input-group">
          <div class="input-group-addon">页面滚动超过</div>
          <input style="text-align:center;" type="number" class="form-control" v-model="element.fixedScrollPx">
          <div class="input-group-addon">像素时出现</div>
        </div>
        <div class="fixed-hint">* 设置为0则一直出现</div>
      </div>
    </div>
  </sidebar>
</template>

<style scoped>

.position-input {
  margin: 6px auto;
  width: 130px; 
}

.fixed-hint {
  padding: 5px;
  color: #999;
}

.input-group-addon {
  cursor: pointer;
}
</style>