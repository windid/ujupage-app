<script>
import { replaceElement }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import elementCommon from './element-common.vue'
import buttonEdit from './button-edit.vue'
import formProps from './form-props.vue'
import formFields from './form-fields.vue'
import { merge } from 'lodash'
import colorMixin from '../mixins/colorMixin.js'

export default {
  //接受父组件传参，element元素属性，sectionId:板块ID，elementId:元素ID
  props:['element','sectionId','elementId'],
  mixins: [colorMixin],
  components: {
    elementCommon,
    buttonEdit,
    formProps,
    formFields
  },
  vuex: {
    actions: {
      replaceElement
    },
    getters: {
      workspace: getWorkspaceData,
    }
  },
  methods:{
    edit: function(){
      this.buttonGroup = 'edit';
    },
    editButton: function(){
      this.editDone();
      this.edit();
      this.buttonEditing = true;
    },
    editButtonDone: function(){
      this.buttonEditing = false;
      this.saveForm();
    },
    editFields: function(){
      this.editDone();
      this.edit();
      this.fieldsEditing = true;
    },
    editFieldsDone: function(){
      this.fieldsEditing = false;
      this.saveForm();
    },
    editProps: function(){
      this.editDone();
      this.edit();
      this.propsEditing = true;
    },
    editPropsDone: function(){
      this.propsEditing = false;
      this.saveForm();
    },
    editDone: function(){
      if (this.buttonEditing) this.editButtonDone();
      if (this.fieldsEditing) this.editFieldsDone();
      if (this.propsEditing)  this.editPropsDone();
      this.buttonGroup = 'main';
    },
    saveForm: function(){
      if (this.changed){
        let formObj = {
          type:"form",
          style:this.element.style,
          button:this.button,
          props:this.formProps,
          fields:this.formFields
        };
        this.replaceElement(this.sectionId, this.elementId, formObj);
        this.changed = false;
      }
    }
  },
  data (){
    return {
      buttonGroup:'main',
      buttonEditing: false,
      changed: false,
      propsEditing:  false,
      fieldsEditing: false,
      button: {
        text: this.element.button.text,
        props: merge({}, this.element.button.props),
      },
      formProps: merge({}, this.element.props),
      formFields: merge([], this.element.fields)
    }
  },
  computed:{
    fieldStyles: function(){
      return {
        backgroundColor:this.getColor(this.formProps.fieldColor),
        borderColor:this.getColor(this.formProps.borderColor),
        color:this.getColor(this.formProps.labelColor),
        boxShadow:(this.formProps.innerShadow) ? "inset 0 1px 6px #ccc" : ""
      }
    },
    // 编辑状态不允许拖动
    draggable: function(){
      return !this.editing;
    },
    editing: function(){
      return (this.buttonEditing || this.propsEditing || this.fieldsEditing);
    }
  },
  events:{
    'button-edit-done': function(){
      this.editButtonDone();
    },
    'form-props-done': function(){
      this.editPropsDone()
    },
    'form-fields-done': function(){
      this.editFieldsDone();
    }
  },
  watch: {
    'workspace.activeElementId': function(val){
      if (val !== this.elementId) this.editDone();
    },
    'button':{
      deep: true,
      handler: function(val){
        this.changed = true;
      }
    },
    'formFields':{
      deep: true,
      handler: function(val){
        this.changed = true;
      }
    },
    'formProps':{
      deep: true,
      handler: function(val){
        this.changed = true;
      }
    }
  }
}
</script>

<template>
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable">
    <div slot="content" @dblclick="edit">
      <div class="el-overlay"></div>
      <div v-for="(index,field) in formFields" class="form-field-wrapper">
        <template v-if="field.type === 'text'">
          <div v-if="!formProps.labelInside"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <input type="text" class="form-field-input" :style="fieldStyles" value="{{formProps.labelInside ? field.label : ''}}">
        </template>

        <template v-if="field.type === 'textarea'">
          <div v-if="!formProps.labelInside"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <textarea class="form-field-input" :style="fieldStyles" rows="3">{{formProps.labelInside ? field.label : ''}}</textarea>
        </template>

        <template v-if="field.type === 'radio'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <div v-for="option in field.options" track-by="$index" :class="{'options-in-line':field.optionsInLine}"><label :style="{color:getColor(formProps.labelColor)}"><input type="radio"> {{option}}</label></div>
        </template>

        <template v-if="field.type === 'checkbox'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <div v-for="option in field.options" track-by="$index" :class="{'options-in-line':field.optionsInLine}"><label :style="{color:getColor(formProps.labelColor)}"><input type="checkbox"> {{option}}</label></div>
        </template>

        <template v-if="field.type === 'dropdown'">
          <div class="form-field-input" :style="fieldStyles">{{field.label}} <span class="caret"></span></div>
          <div style="clear:both;"></div>
        </template>

        <template v-if="field.type === 'china-state'">
          <div>
            <div v-if="!field.hideLabel"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          </div>
          <div>
            <div class="form-field-input form-field-dropdown" style="margin-right:2%;width:32%" :style="fieldStyles">省份 <span class="caret"></span></div>
            <div class="form-field-input form-field-dropdown" style="margin-right:2%;width:32%" :style="fieldStyles">城市 <span class="caret"></span></div>
            <div class="form-field-input form-field-dropdown" style="width:32%" :style="fieldStyles">区县 <span class="caret"></span></div>
            <div style="clear:both;"></div>
          </div>
        </template>

      </div> <!-- End fields for -->
      <div class="element-button"
        @mouseenter = "hover = true"
        @mouseleave = "hover = false"
        :style="[
          {
            borderRadius: button.props.borderRadius,
            fontSize: button.props.fontSize,
            backgroundColor:hover ? getColor(button.props.hoverColor) : getColor(button.props.backgroundColor),
            borderColor:getColor(button.props.borderColor),
            color:getColor(button.props.fontColor)
          }
        ]" 
        :class="{
          'element-button-shadow':button.props.shadow,
          'element-button-border':button.props.border,
          'element-button-bold':button.props.bold
        }">
        {{button.text}}
      </div>
    </div>
    <template slot="main-buttons-extend">
      <div class="btn btn-primary" title="编辑" @click="edit">编辑</div>
    </template>
    <template slot="button-groups">
      <div v-show="buttonGroup === 'edit'" class="btn-group el-btn-group" role="group">
        <div class="btn btn-default" title="表单字段" :class="{active:fieldsEditing}" @click="editFields">表单字段</div>
        <div class="btn btn-default" title="表单设置" :class="{active:propsEditing}" @click="editProps">表单设置</div>
        <div class="btn btn-default" title="表单按钮" :class="{active:buttonEditing}" @click="editButton">按钮</div>
        <div class="btn btn-success" title="完成编辑" @click="editDone">完成</div>
      </div>
    </template>
    <template slot="tools">
      <button-edit :show.sync="buttonEditing" :button.sync="button"></button-edit>
      <form-fields :show.sync="fieldsEditing" :form-fields.sync="formFields"></form-fields>
      <form-props :show.sync="propsEditing" :form-props.sync="formProps"></form-props>
    </template>
  </element-common>
</template>

<style>
.form-field-wrapper{
  padding:5px 0;
}

.form-field-input{
  line-height: 30px;
  width: 100%;
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  padding: 2px 8px;
}

.form-field-input .caret{
  float:right;
  margin-top:12px;
  margin-right:2px;
}

.form-field-dropdown{
  float:left;
  width:auto;
}

.options-in-line{
  display: inline-block;
  margin-right:10px;
}

.shadow-inside{
  box-shadow: inset 0 1px 6px #ccc;
}
</style>