<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    msg: 'messageBox'
  }),
  methods: {
    cancel(){
      if (this.msg.onCancel){
        this.msg.onCancel();
      }
      this.$store.dispatch('closeMessageBox');
    },
    ok(){
      if (this.msg.onConfirm){
        if (this.msg.type === 'input'){
          const val = this.$refs.msgInput.value;
          this.msg.onConfirm(val);
        } else {
          this.msg.onConfirm();
        }
      }
      this.$store.dispatch('closeMessageBox');
    }
  },
  watch: {
    'msg.show': function(val){
      if (val){
        if (this.msg.type === 'input'){
          this.$nextTick(() => {
            this.$refs.msgInput.focus();
          });
        } else {
          this.$nextTick(() => {
            this.$el.focus();
          });
        }
      }
    }
  }
}
</script>

<template>
  <div class="message-box-mask" v-if="msg.show" tabindex="-1" @keyup.enter="ok" @keyup.esc="cancel">
    <div class="message-box-wrapper">
      <div class="message-box-container" :style="{width:msg.width}">
        
        <div class="message-box-header">
          <span class="glyphicon glyphicon-exclamation-sign"></span> {{msg.header || '提示信息'}}
        </div>
        
        <div class="message-box-body container-fluid">
          <input v-if="msg.type === 'input'" ref="msgInput" type="text" :placeholder="msg.header" :value="msg.content" class="form-control">
          <span v-else>{{msg.content}}</span>
        </div>

        <div class="message-box-footer">
          <slot name="footer">
            <button v-show="msg.type !== 'warning'" class="btn btn-default btn-sm" @click="cancel">取消</button> &nbsp;
            <button class="btn btn-primary btn-sm" @click="ok">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
.message-box-mask {
  position: fixed;
  z-index: 1100000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.message-box-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.message-box-container {
  position: relative;
  margin:0 auto;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.message-box-header {
  font-size: 16px;
  padding:12px;
}

.message-box-body {
  border-top:1px solid #ddd;
  border-bottom:1px solid #ddd;
  background: #f6f6f6;
  padding:30px 12px;
}

.message-box-footer{
  padding:12px;
  text-align: right;
}
</style>