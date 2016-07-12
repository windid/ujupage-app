<script>
import sidebar from './sidebar.vue'
import colorPicker from './color-picker.vue'
import checkboxButton from './checkbox-button.vue'
import colorMixin from '../mixins/colorMixin.js'

export default {
  props:{
    formProps: {
      type: Object,
      require: true
    },
    show:{
      type: Boolean,
      require: true
    }
  },
  mixins: [colorMixin],
  components: {
    sidebar,
    colorPicker,
    checkboxButton
  },
  methods:{
    editDone: function(){
      this.$dispatch('form-props-done');
    }
  }
}
</script>

<template>
  <sidebar :show.sync="show" slot="tools">
    <div slot="header">
      <div class="btn btn-success" @click="editDone">&nbsp; 完成 &nbsp;</div>
    </div>
    <div slot="body">
      <div class="sidebar-block color-groups">

        <color-picker :color.sync="formProps.fieldColor">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(formProps.fieldColor)}"></div>
            <div class="float-color-block-text">背景</div>
          </div>
        </color-picker>

        <color-picker :color.sync="formProps.inputColor">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(formProps.inputColor)}"></div>
            <div class="float-color-block-text">文字</div>
          </div>
        </color-picker>
        
        <color-picker :color.sync="formProps.labelColor" :position="'right'">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(formProps.labelColor)}"></div>
            <div class="float-color-block-text">标签</div>
          </div>
        </color-picker>

        <color-picker :color.sync="formProps.borderColor" :position="'right'">
          <div  data-toggle="dropdown" class="float-color-picker">
            <div class="float-color-block shadow" :style="{background:getColor(formProps.borderColor)}"></div>
            <div class="float-color-block-text">边框</div>
          </div>
        </color-picker>

      </div>

      <div class="sidebar-block" style="text-align:center;">
        <checkbox-button :value.sync="formProps.labelInside">标签内置</checkbox-button> &nbsp; 
        <checkbox-button :value.sync="formProps.innerShadow">内阴影</checkbox-button> &nbsp; 
      </div>

      <div class="sidebar-block">
        <p>跳转至：</p>
        <input type="text" class="form-control input-text-shadow shadow" placeholder="表单提交成功后的跳转URL" v-model="formProps.redirect">
      </div>

      <div class="sidebar-block">
        <p>感谢语：</p>
        <textarea class="form-control shadow" rows="3" v-model="formProps.thankyou"></textarea>
      </div>
    </div>
  </sidebar>
</template>

<style>
/**/
</style>

