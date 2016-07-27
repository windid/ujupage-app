<script>
export default {
  vuex: {
    actions: {
      
    },
    getters: {
      
    }
  },
}
</script>

<template>
  <div class="modal-mask" transition="modal">
    <div class="modal-wrapper" @click="show = false">
      <div v-el:container class="modal-container" :style="{width:width,height:height}" @click.stop>
        
        <div class="modal-header">
          <button type="button" class="close fr" aria-label="Close" @click="show = false"><span aria-hidden="true">&times;</span></button>
          <slot name="header">
          </slot>
        </div>
        
        <div class="modal-body container-fluid">
          <slot name="body">
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-primary btn-sm" @click="show = false">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>