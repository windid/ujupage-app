<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: 'auto'
    }
  },
  data () {
    return {
      mouseOnBody: false
    }
  },
  watch: {
    show (val) {
      const body = document.body
      if (val) {
        body.classList.add('no-scroll')
      } else {
        body.classList.remove('no-scroll')
      }
    }
  }
}
</script>

<template>
<transition name="fade">
  <div v-show="show" class="modal-mask" @mousedown.stop>
    <div class="modal-wrapper" @click.stop="$emit('close')" :class="{'no-scroll': mouseOnBody}">
      <div class="modal-container" :style="{width: width, height: height}" @click.stop>
        
        <div class="modal-header">
          <div class="close fr" aria-label="Close" @click="$emit('close')"><span aria-hidden="true">&times;</span></div>
          <slot name="header"></slot>
        </div>
        
        <div class="modal-body container-fluid"
          ref="modalBody"
          @mouseenter="mouseOnBody = true"
          @mouseleave="mouseOnBody = false">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <div class="btn btn-primary btn-sm" @click="$emit('close')">确定</div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .6);
}

.modal-wrapper {
  height: 100%;
  text-align: center;
  overflow-y: auto;
  &::after {
    display: inline-block;
    content: '';
    height: 100%;
    vertical-align: middle;
  }
}

.modal-container {
  position: relative;
  display: inline-block;
  margin: 30px auto;
  background-color: #fff;
  border-radius: 6px;
  overflow: hidden;
  vertical-align: middle;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.modal-header {
  height: 60px;
  padding: 12px;
  background: #f6f6f6;
  border-bottom: 1px solid #eee;
}

.modal-body {
  height: calc(100% - 114px);
  padding: 12px;
  background: #fff;
  border-bottom: 1px solid #eee;
  overflow: auto;
  position: relative;
}

.modal-footer{
  padding:12px;
  height: 54px;
  text-align: right;
}

</style>