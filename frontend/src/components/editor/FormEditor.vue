<script>
import Sidebar from '../ui/Sidebar'
import FormFieldsEditor from './FormFieldsEditor'
import FormPropsEditor from './FormPropsEditor'
import FormButtonEditor from './FormButtonEditor'

export default {
  props: ['show', 'value'],
  components: {
    Sidebar,
    FormFieldsEditor,
    FormPropsEditor,
    FormButtonEditor
  },
  data () {
    return {
      currentTab: 'fields'
      // formElement: { ...this.value }
    }
  },
  methods: {
    switchTab (tab) {
      this.currentTab = tab
      this.$emit('save')
    }
  },
  computed: {
    formElement () {
      return { ...this.value }
    }
  }
}

</script>

<template>

  <sidebar v-if="show" :show="show" @close="$emit('edit-done')">
    <div slot="header">
      <div class="btn-group">
        <div class="btn btn-default" @click="switchTab('fields')" :class="{ active: currentTab === 'fields' }">字段</div>
        <div class="btn btn-default" @click="switchTab('props')" :class="{ active: currentTab === 'props' }">设置</div>
        <div class="btn btn-default" @click="switchTab('button')" :class="{ active: currentTab === 'button' }">按钮</div>
      </div>
      <div class="btn btn-success" @click="$emit('edit-done')">完成</div>
    </div>
    <div slot="body">
      <component :is="'form-' + currentTab + '-editor'" v-model="formElement[currentTab]"></component>
    </div>
  </sidebar>

</template>