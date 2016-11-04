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
        this.replaceElement(this.elementId, formObj);
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
      formFields: merge([], this.element.fields),
      resize:{
      }
    }
  },
  computed:{
    fieldStyles: function(){
      return {
        backgroundColor:this.getColor(this.formProps.fieldColor),
        borderColor:this.getColor(this.formProps.borderColor),
        color:this.getColor(this.formProps.fontColor),
        boxShadow:this.formProps.boxShadow
      }
    },
    // 编辑状态不允许拖动，不允许缩放
    draggable: function(){
      return !this.editing;
    },
    resizable: function(){
      return (!this.editing && this.workspace.activeElementId === this.elementId);
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
  <element-common :element="element" :section-id="sectionId" :element-id="elementId" :button-group.sync="buttonGroup" :draggable.sync="draggable" :resize="resize" :resizable="resizable">
    <div slot="content" @dblclick="edit">
      <div class="el-overlay"></div>
      <div v-for="(index,field) in formFields" class="form-group">
        <template v-if="field.type === 'text'">
          <div v-if="!formProps.labelInside"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <input type="text" class="form-control form-field-input" :style="fieldStyles" value="{{formProps.labelInside ? field.label : ''}}">
        </template>

        <template v-if="field.type === 'textarea'">
          <div v-if="!formProps.labelInside"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <textarea class="form-control form-field-input" :style="fieldStyles" rows="3">{{formProps.labelInside ? field.label : ''}}</textarea>
        </template>

        <template v-if="field.type === 'radio'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <div v-for="option in field.options" track-by="$index" :class="{'options-in-line':field.optionsInLine}">
            <label :style="{color:getColor(formProps.labelColor)}"><input type="radio"> {{option}}</label>
          </div>
        </template>

        <template v-if="field.type === 'checkbox'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <div v-for="option in field.options" track-by="$index" :class="{'options-in-line':field.optionsInLine}">
            <label :style="{color:getColor(formProps.labelColor)}"><input type="checkbox"> {{option}}</label>
          </div>
        </template>

        <template v-if="field.type === 'dropdown'">
          <select class="form-control form-field-input" :style="fieldStyles">
            <option value="">{{field.label}} </option>
          </select>
        </template>

        <template v-if="field.type === 'china-state'">
          <div v-if="!field.hideLabel"><label :style="{color:getColor(formProps.labelColor)}">{{field.label}}</label></div>
          <div>
            <select class="form-control form-field-input" style="float:left;margin-right:2%;width:32%" :style="fieldStyles">
              <option value="">省份</option>
            </select>
            <select class="form-control form-field-input" style="float:left;margin-right:2%;width:32%" :style="fieldStyles">
              <option value="">城市</option>
            </select>
            <select class="form-control form-field-input" style="float:left;width:32%" :style="fieldStyles">
              <option value="">区县</option>
            </select>
            <div style="clear:both;"></div>
          </div>
        </template>

      </div> <!-- End fields for -->
      
      <button type="submit" class="form-control element-button"
        @mouseenter = "hover = true"
        @mouseleave = "hover = false"
        :style="[
          {
            borderRadius: button.props.borderRadius,
            fontSize: button.props.fontSize,
            boxShadow: button.props.boxShadow,
            fontWeight: button.props.fontWeight,
            borderStyle: button.props.borderStyle,
            backgroundColor: hover ? getColor(button.props.hoverColor) : getColor(button.props.backgroundColor),
            borderColor: getColor(button.props.borderColor),
            color: getColor(button.props.color),
          }
        ]">
        {{button.text}}
      </button>
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
  margin:6px 0;
}

.form-field-input{
  font-size: 16px;
  height: 40px;
  line-height: 20px;
  padding: 4px 10px;
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