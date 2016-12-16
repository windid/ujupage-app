<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    msg: 'message',
    show: 'showMessage'
  }),
  data () {
    return {
      error: ''
    }
  },
  methods: {
    cancel () {
      if (this.msg.onCancel) {
        this.msg.onCancel()
      }
      this.$store.dispatch('nextMessage')
    },
    ok () {
      if (this.msg.onConfirm) {
        if (this.msg.type === 'input') {
          const val = this.$refs.msgInput.value
          this.error = this.msg.onConfirm(val.trim()) || ''
        } else {
          this.msg.onConfirm()
        }
      }
      !this.error && this.$store.dispatch('nextMessage')
    }
  },
  watch: {
    'show': function (val) {
      this.error = ''
      if (val) {
        if (this.msg.type === 'input') {
          this.$nextTick(() => {
            this.$refs.msgInput.focus()
          })
        } else {
          this.$nextTick(() => {
            this.$el.focus()
          })
        }
      }
    }
  }
}
</script>

<template>
<transition name="fade">
  <div class="msg-mask" v-if="show" tabindex="-1" @keyup.enter="ok" @keyup.esc="cancel">
    <div class="msg-wrapper">
      <div class="msg-container" :style="{width:msg.width}">
        
        <div class="msg-header">
          <span class="glyphicon glyphicon-exclamation-sign"></span> {{msg.header || '提示信息'}}
        </div>
        
        <div class="msg-body container-fluid">
          <template v-if="msg.type === 'input'">
            <div class="input-group">
              <div class="input-group-addon" v-html="msg.inputAddon"></div>
              <input ref="msgInput" type="text" :placeholder="msg.placeholder || msg.header" :value="msg.content" class="form-control">
            </div>
            
            <p v-if="msg.hint !== ''" class="msg-hint">{{msg.hint}}</p>
            <p v-if="error !== ''" class="text-danger">{{error}}</p>
          </template>
          <span v-else>{{msg.content}}</span>
        </div>

        <div class="msg-footer">
          <slot name="footer">
            <button v-show="msg.type !== 'warning'" class="btn btn-default btn-sm" @click="cancel">取消</button> &nbsp;
            <button class="btn btn-primary btn-sm" @click="ok">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>


<style scoped>
.msg-mask {
  position: fixed;
  z-index: 110000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.msg-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.msg-container {
  position: relative;
  margin:0 auto;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.msg-header {
  font-size: 16px;
  padding: 12px;
}

.msg-body {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background: #f9f9f9;
  padding:30px 12px;
}

.msg-footer {
  padding: 12px;
  text-align: right;
}

.msg-hint {
  margin: 12px 0;
  color: #999;
}
</style>