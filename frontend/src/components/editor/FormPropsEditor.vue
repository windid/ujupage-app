<script>
import ColorPicker from './ColorPicker'
import CheckboxButton from './CheckboxButton'
import colorMixin from '../../mixins/colorMixin'

export default {
  props: ['show', 'value'],
  components: {
    ColorPicker,
    CheckboxButton
  },
  mixins: [colorMixin],
  data () {
    return {
      formProps: this.value
    }
  }
}
</script>


<template>
  <div>
    <div class="sidebar-block color-groups">
      <div  class="float-color-picker">
        <div class="float-color-block-text">背景</div>
        <color-picker v-model="formProps.fieldColor">
          <div class="float-color-block" data-toggle="dropdown" :style="{background:getColor(formProps.fieldColor)}"></div>
        </color-picker>
      </div>

      <div  class="float-color-picker">
        <div class="float-color-block-text">文字</div>
        <color-picker v-model="formProps.inputColor">
          <div class="float-color-block" data-toggle="dropdown" :style="{background:getColor(formProps.inputColor)}"></div>
        </color-picker>
      </div>

      <div  class="float-color-picker">
        <div class="float-color-block-text">标签</div>
        <color-picker v-model="formProps.labelColor">
          <div class="float-color-block" data-toggle="dropdown" :style="{background:getColor(formProps.labelColor)}"></div>
        </color-picker>
      </div>

      <div  class="float-color-picker">
        <div class="float-color-block-text">边框</div>
        <color-picker v-model="formProps.borderColor">
          <div class="float-color-block" data-toggle="dropdown" :style="{background:getColor(formProps.borderColor)}"></div>
        </color-picker>
      </div>
      <div style="clear:both"></div>
    </div>

    <div class="sidebar-block" style="text-align:center;">
      <checkbox-button v-model="formProps.labelInside">标签内置</checkbox-button> &nbsp; 
      <checkbox-button v-model="formProps.boxShadow" :values="['','inset 0 1px 6px #ccc']">内阴影</checkbox-button> &nbsp; 
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
</template>

<style scoped>

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