<script>
import Sidebar from '../ui/Sidebar'
import FormButtonEditor from './FormButtonEditor'

export default {
  props: ['show', 'value'],
  components: {
    Sidebar,
    FormButtonEditor
  }
}

</script>

<template>
  <sidebar v-if="show" :show="show" @close="$emit('edit-done')">
    <div slot="header">
      <div class="btn btn-success" @click="$emit('edit-done')">完成</div>
    </div>
    <div slot="body">
      <form-button-editor v-model="value"></form-button-editor>
    </div>
  </sidebar>
</template>

<style>

.float-color-picker {
  float: left;
  width: 55px;
  text-align: center;
  cursor: pointer;
  margin-left: 13px;
}

.float-color-picker:first-child {
  margin: 0;
}

.color-groups .btn-group {
  width:100%;
}

.float-color-block {
  height: 30px;
  width: 100%;
  border: 2px solid #ccc;
  border-radius: 4px;
}

.font-size-input {
  float: left;
  max-width: 106px;
}

.corner-radius-input {
  float: right;
  max-width: 120px;
}

.float-color-block-text {
  text-align: center;
  font-size: 14px;
}

</style>