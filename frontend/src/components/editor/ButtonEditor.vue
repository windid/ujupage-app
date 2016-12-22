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

