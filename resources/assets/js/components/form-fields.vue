<script>
import sidebar from './sidebar.vue'
import colorPicker from './color-picker.vue'
import checkboxButton from './checkbox-button.vue'
import colorMixin from '../mixins/colorMixin.js'
import dropdown from './dropdown.vue'

export default {
  props:{
    formFields: {
      type: Array,
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
    checkboxButton,
    dropdown
  },
  data(){
    return {
      fieldTypes: {
        'text':'单行文本',
        'textarea':'多行文本',
        'radio':'单选框',
        'checkbox':'复选框',
        'dropdown':'下拉菜单',
        'china-state':'省市县(中国)'
      },
      showFieldsType:false,
      currentField:null,
      editingField:null,
    }
  },
  methods:{
    editDone: function(){
      this.$dispatch('form-fields-done');
    },
    addField: function(type, label = '', validator = []){
      let newField = {
        type:type,
        label:label,
        validator:validator
      };
      if (type === 'radio' || type === 'checkbox' || type === 'dropdown'){
        newField.options = ['选项1','选项2'];
      }
      const newFieldId = this.formFields.length;
      this.formFields.push(newField); 
      this.editingField = newFieldId;
      this.showFieldsType = false;
    },
    removeField: function(fieldId){
      this.formFields.splice(fieldId, 1);
    },
    moveField: function(dir, fieldId){
      let target = fieldId;
      if (dir === 'down' && fieldId < this.formFields.length -1) target++;
      if (dir === 'up' && fieldId > 0) target--;
      if (target !== fieldId){
        this.formFields[fieldId] = this.formFields.splice(target, 1, this.formFields[fieldId])[0];
      }
      this.editingField = null;
    },
    addOption: function(fieldId){
      let newOptionId = this.formFields[fieldId].options.length;
      this.formFields[fieldId].options.push("");
      Vue.nextTick(function(){
        var el = document.getElementById('form-field-options');
        el.scrollTop = el.scrollHeight;
        var input = document.getElementById('field-option-' + fieldId + '-' + newOptionId);
        input.focus();
      });
    },
    removeOption: function(fieldId,optionId){
      this.formFields[fieldId].options.splice(optionId, 1);
    }
  },
  watch:{
    'editingField': function(newVal){
      if (newVal !== null){
        let input = document.getElementById('field-label-' + newVal);
        input.focus();
      } else {
        this.currentField = null;
      }
    }
  }
}
</script>

<template>
  <sidebar :show.sync="show" slot="tools">
    <div slot="header">
      <div class="btn btn-success" @click="editDone">&nbsp; 完成 &nbsp;</div>
      <div class="fr">
        <dropdown :show.sync="showFieldsType">
          <slot><div><div class="btn btn-primary" data-toggle="dropdown">+ 字段</div></div></slot>
          <div slot="dropdown-menu" class="dropdown-menu dropdown-menu-right dropdown-field-type-wrapper">
            <div class="dropdown-field-type" @click="addField('text')">单行文本</div>
            <div class="dropdown-field-type" @click="addField('textarea')">多行文本</div>
            <div class="dropdown-field-type" @click="addField('radio')">单选框</div>
            <div class="dropdown-field-type" @click="addField('checkbox')">复选框</div>
            <div class="dropdown-field-type" @click="addField('dropdown')">下拉菜单</div>
            <!-- <div class="dropdown-field-type">日期</div> -->

            <h5 class="dropdown-field-type-preset">预设字段</h5>
            <div class="dropdown-field-type" @click="addField('text','姓名',['required'])">姓名</div>
            <div class="dropdown-field-type" @click="addField('text','电子邮件',['required','email'])">电子邮件</div>
            <div class="dropdown-field-type" @click="addField('text','手机号码',['required','mobile'])">手机号码</div>
            <div class="dropdown-field-type" @click="addField('china-state')">省/市/县</div>
          </div>
        </dropdown>
      </div>
    </div>
    <div slot="body" @click="editingField = null">

      <div class="sidebar-block">
        <div v-for="(fieldId,field) in formFields" class="form-field-label-wrapper" @mouseenter="currentField = fieldId" @mouseleave="currentField = null" @click.stop :style="{background:(editingField === fieldId)?'#fff':''}">
          <div class="form-field-label">
            {{field.label}}
          </div>
          <span class="form-field-type">{{fieldTypes[field.type]}}</span>
          <div style="clear:both"></div>
          <div v-show="currentField === fieldId" class="btn-group btn-group-sm form-field-operation" role="group" transition="fade" >
            <div class="btn btn-primary" title="修改" @click="editingField = fieldId"><span class="glyphicon glyphicon-pencil"></span></div>
            <div class="btn btn-default" title="上移" @click="moveField('up',fieldId)"><span class="glyphicon glyphicon-chevron-up"></span></div>
            <div class="btn btn-default" title="下移" @click="moveField('down',fieldId)"><span class="glyphicon glyphicon-chevron-down"></span></div>
            <div class="btn btn-default" title="删除" @click="removeField(fieldId)"><span class="glyphicon glyphicon-trash"></span></div>
          </div>
          <div v-if="editingField === fieldId" class="field-edit-form">
            <div class="input-group shadow">
              <div class="input-group-addon"> 标签 </div>
              <input type="text" class="form-control input-text-shadow" placeholder="新建表单字段" id="field-label-{{fieldId}}" v-model="field.label">
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
            <!-- 省/市/县 选项 -->
            <div v-if="field.type === 'china-state'" class="form-field-configs">
              <div><label><input type="checkbox" v-model="field.validator" value="required"> 必填项</label></div>
              <div><label><input type="checkbox" v-model="field.hideLabel"> 隐藏标签</label></div>
            </div>
            <div v-if="field.type === 'radio' || field.type === 'checkbox' || field.type === 'dropdown'">
              <div class="form-field-options" id="form-field-options">
                <div v-for="(optionId, option) in field.options" track-by="$index" class="form-field-option">
                  <input class="form-control" type="text" id="field-option-{{fieldId}}-{{optionId}}" placeholder="新选项" v-model="option" />
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
  </sidebar>
</template>

<style>

.form-field-label-wrapper{
  position: relative;
  border: 1px solid #ccc;
  background: #eee;
  border-radius: 4px;
  padding: 6px;
  margin-bottom: 8px;
  
}

.form-field-label{
  float:left;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.form-field-type{
  float: right;
  color: #ccc;
}

.dropdown-field-type-wrapper{
  width:200px;
}

.dropdown-field-type{
  float: left;
  width: 82px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 8px;
  padding: 6px;
  text-align: center;
  background: #eee;
  cursor: pointer;;
}

.field-edit-form{
  margin-top: 15px;
}

.dropdown-field-type-preset{
  clear: both;
  margin: 8px;
  padding:10px 0 5px 0;
  border-bottom:1px solid #ccc;
}

.form-field-operation{
  position:absolute;
  right:1px;
  top:1px;
}

.form-field-configs{
  margin: 8px 2px;
}

.form-field-configs label{
  font-weight: normal;
  cursor: pointer;
}

.form-field-options{
  max-height:150px;
  overflow: auto;
}

.form-field-option{
  position: relative;
  margin: 3px 0;
}

.form-field-option-remove{
  position: absolute;
  right:5px;
  top:9px;
  color:#999;
  cursor: pointer;
}

.form-field-addoption{
  text-align: center;
  margin: 8px;
}

</style>

