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
  }
}
</script>

<template>
<transition name="fade">
  <div v-show="show" class="modal-mask" @mousedown.stop>
    <div class="modal-wrapper" @click="$emit('close')">
      <div class="modal-container" :style="{width: width, height: height}" @click.stop>
        
        <div class="modal-header">
          <button type="button" class="close fr" aria-label="Close" @click="$emit('close')"><span aria-hidden="true">&times;</span></button>
          <slot name="header"></slot>
        </div>
        
        <div class="modal-body container-fluid">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-primary btn-sm" @click="$emit('close')">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 1010000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  height: 100%;
}

.modal-container {
  position: relative;
  margin: 0 auto;
  margin-top:60px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
}

.modal-header {
  height: 65px;
  padding:12px;
}

.modal-body {
  height:calc(100% - 119px);
  padding:12px;
  background: #eee;
  border:1px solid #ccc;
  overflow: auto;
  position: relative;
}

.modal-footer{
  padding:12px;
  height: 54px;
  text-align: right;
}

</style>