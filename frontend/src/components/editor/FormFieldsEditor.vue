<script>
import ColorPicker from './ColorPicker'
import Dropdown from '../ui/Dropdown'
import colorMixin from '../../mixins/colorMixin'
import Vue from 'vue'

export default {
  props: ['value'],
  components: {
    ColorPicker,
    Dropdown
  },
  mixins: [colorMixin],
  data () {
    return {
      formFields: this.value,
      fieldTypes: {
        'text': '单行文本',
        'textarea': '多行文本',
        'radio': '单选框',
        'checkbox': '复选框',
        'dropdown': '下拉菜单',
        'hidden': '隐藏项',
        'china-state': '省市县(中国)'
      },
      showFieldsType: false,
      currentField: null,
      editingField: null
    }
  },
  methods: {
    addField (type, label = '', validator = []) {
      const newField = {
        type: type,
        label: label,
        validator: validator
      }
      if (type === 'radio' || type === 'checkbox' || type === 'dropdown') {
        newField.options = ['选项1', '选项2']
      }
      if (type === 'radio' || type === 'checkbox') {
        newField.hideLabel = false
        newField.optionsInLine = false
      }
      if (type === 'hidden') {
        newField.val = ''
      }
      const newFieldId = this.formFields.length
      this.formFields.push(newField)
      this.editingField = newFieldId
      this.showFieldsType = false
    },

    removeField (fieldId) {
      this.formFields.splice(fieldId, 1)
    },

    moveField (dir, fieldId) {
      let target = fieldId
      if (dir === 'down' && fieldId < this.formFields.length - 1) target++
      if (dir === 'up' && fieldId > 0) target--
      if (target !== fieldId) {
        this.formFields[fieldId] = this.formFields.splice(target, 1, this.formFields[fieldId])[0]
      }
      this.editingField = null
    },

    addOption (fieldId) {
      const newOptionId = this.formFields[fieldId].options.length
      this.formFields[fieldId].options.push('')
      this.$nextTick(() => {
        var el = document.getElementById('form-field-options')
        el.scrollTop = el.scrollHeight
        var input = document.getElementById('field-option-' + fieldId + '-' + newOptionId)
        input.focus()
      })
    },

    updateOption (fieldId, optionId, value) {
      Vue.set(this.formFields[fieldId].options, optionId, value)
    },

    removeOption (fieldId, optionId) {
      this.formFields[fieldId].options.splice(optionId, 1)
    }
  }
}

</script>

<template>
<div>
  <div class="sidebar-block">
    <dropdown :show="showFieldsType" @toggle="showFieldsType = !showFieldsType">
      <slot><div><div class="btn btn-primary" data-toggle="dropdown">+ 字段</div></div></slot>
      <div slot="dropdown-menu" class="dropdown-menu dropdown-field-type-wrapper">
        <div class="dropdown-field-type" @click="addField('text')">单行文本</div>
        <div class="dropdown-field-type" @click="addField('textarea')">多行文本</div>
        <div class="dropdown-field-type" @click="addField('radio')">单选框</div>
        <div class="dropdown-field-type" @click="addField('checkbox')">复选框</div>
        <div class="dropdown-field-type" @click="addField('dropdown')">下拉菜单</div>
        <div class="dropdown-field-type" @click="addField('hidden')">隐藏项</div>
        <!-- <div class="dropdown-field-type">日期</div> -->

        <h5 class="dropdown-field-type-preset">预设字段</h5>
        <div class="dropdown-field-type" @click="addField('text', '姓名', ['required'])">姓名</div>
        <div class="dropdown-field-type" @click="addField('text', '电子邮件', ['required', 'email'])">电子邮件</div>
        <div class="dropdown-field-type" @click="addField('text', '手机号码', ['required', 'mobile'])">手机号码</div>
        <!-- <div class="dropdown-field-type" @click="addField('china-state')">省/市/县</div> -->
      </div>
    </dropdown>
  </div>

  <div class="sidebar-block">
    <div v-for="(field, fieldId) in formFields" class="form-field-label-wrapper" @mouseenter="currentField = fieldId" @mouseleave="currentField = null" @click.stop :style="{background:(editingField === fieldId)?'#fff':''}">
      <div class="form-field-label">
        {{field.label}}
      </div>
      <span class="form-field-type">{{fieldTypes[field.type]}}</span>
      <div style="clear:both"></div>
      <div v-show="currentField === fieldId" class="btn-group btn-group-sm form-field-operation">
        <div class="btn btn-primary" title="修改" @click="editingField = fieldId"><span class="glyphicon glyphicon-pencil"></span></div>
        <div class="btn btn-default" title="上移" @click="moveField('up',fieldId)"><span class="glyphicon glyphicon-chevron-up"></span></div>
        <div class="btn btn-default" title="下移" @click="moveField('down',fieldId)"><span class="glyphicon glyphicon-chevron-down"></span></div>
        <div class="btn btn-default" title="删除" @click="removeField(fieldId)"><span class="glyphicon glyphicon-trash"></span></div>
      </div>
      <div v-if="editingField === fieldId" class="field-edit-form">
        <div class="input-group shadow">
          <div class="input-group-addon"> 标签 </div>
          <input type="text" class="form-control input-text-shadow" placeholder="新建表单字段" :id="'field-label-' + fieldId" v-model="field.label">
        </div>
        <!-- 单行、多行文本选项 -->
        <div v-if="field.type === 'text' || field.type === 'textarea'" class="form-field-configs">
          <div><label><input type="checkbox" v-model="field.validator" value="required"> 必填项</label></div>
          <div><label><input type="checkbox" v-model="field.validator" value="mobile"> 校验为手机号码</label></div>
          <div><label><input type="checkbox" v-model="field.validator" value="email"> 校验为Email</label></div>
          <div><label><input type="checkbox" v-model="field.validator" value="number"> 校验为数字</label></div>
        </div>
        <!-- 单选、多选框选项 -->
        <div v-if="field.type === 'radio' || field.type === 'checkbox'" class="form-field-configs">
          <div><label><input type="checkbox" v-model="field.validator" value="required"> 必填项</label></div>
          <div><label><input type="checkbox" v-model="field.hideLabel"> 隐藏标签</label></div>
          <div><label><input type="checkbox" v-model="field.optionsInLine"> 单行排列选项</label></div>
        </div>
        <!-- 下拉菜单选项 -->
        <div v-if="field.type === 'dropdown'" class="form-field-configs">
          <div><label><input type="checkbox" v-model="field.validator" value="required"> 必填项</label></div>
        </div>
        <div v-if="field.type === 'hidden'" class="form-field-configs">
          <input type="text" class="form-control input-text-shadow" placeholder="取值" v-model="field.val">
        </div>
        <!-- 省/市/县 选项 -->
        <div v-if="field.type === 'china-state'" class="form-field-configs">
          <div><label><input type="checkbox" v-model="field.validator" value="required"> 必填项</label></div>
          <div><label><input type="checkbox" v-model="field.hideLabel"> 隐藏标签</label></div>
        </div>
        <div v-if="['radio', 'checkbox', 'dropdown'].indexOf(field.type) > -1">
          <div class="form-field-options" id="form-field-options">
            <div v-for="(option, optionId) in field.options" class="form-field-option">
              <input class="form-control" type="text" :id="'field-option-'+fieldId+'-'+optionId" placeholder="新选项" :value="option" @input="updateOption(fieldId, optionId, $event.target.value)" >
              <span class="glyphicon glyphicon-remove form-field-option-remove" @click="removeOption(fieldId, optionId)"></span>
            </div>
          </div>
          <div class="form-field-addoption">
            <div class="btn btn-primary btn-sm" @click="addOption(fieldId)">+ 添加选项</div>
          </div>
        </div>
        <div class="btn btn-success btn-sm fr" @click="editingField = null"><span class="glyphicon glyphicon-ok"></span></div>
        <div style="clear:both"></div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.form-field-label-wrapper {
  position: relative;
  border: 1px solid #ccc;
  background: #eee;
  border-radius: 4px;
  padding: 6px;
  margin-bottom: 8px;
}

.form-field-label {
  float:left;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.form-field-type {
  float: right;
  color: #ccc;
}

.dropdown-field-type-wrapper {
  width:200px;
}

.dropdown-field-type {
  float: left;
  width: 82px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 8px;
  padding: 6px;
  text-align: center;
  background: #eee;
  cursor: pointer;
}

.field-edit-form {
  margin-top: 15px;
}

.dropdown-field-type-preset {
  clear: both;
  margin: 8px;
  padding:10px 0 5px 0;
  border-bottom:1px solid #ccc;
}

.form-field-operation {
  position:absolute;
  right:1px;
  top:1px;
}

.form-field-configs {
  margin: 8px 2px;
}

.form-field-configs label {
  font-weight: normal;
  cursor: pointer;
}

.form-field-options {
  max-height:150px;
  overflow: auto;
}

.form-field-option {
  position: relative;
  margin: 3px 0;
}

.form-field-option-remove {
  position: absolute;
  right: 5px;
  top: 9px;
  color: #999;
  cursor: pointer;
}

.form-field-addoption {
  text-align: center;
  margin: 8px;
}

</style>