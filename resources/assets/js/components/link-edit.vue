<script>
import { merge } from 'lodash'

export default {
  props: {
    linkObj:{
      type: Object,
      required: true
    },
    linkEditing:{
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      changed: false,
      link: {
        type:     (this.linkObj.type) || '',
        url:      (this.linkObj.url)  || '',
        isNewTab: (this.linkObj.isNewTab) || false,
        isTrack:  (this.linkObj.isTrack)  || false
      }
    }
  },
  methods:{
    editDone: function(){
      if (this.linkEditing) {
        this.$dispatch('link-edit-done',this.changed, this.link);
        this.changed = false;
      }
    },
    removeLink: function(){
      this.link.type = '';
      this.link.url  = '';
      this.changed = true;
      this.editDone();
    }
  },
  watch:{
    'link': {
      deep: true,
      handler: function(newLink){
        this.link.type = (this.link.url) ? 'outlink' : ''; 
        this.changed = true;
      }
    }
  },
  beforeDestroy(){
    this.editDone();
  }
}
</script>

<template>
<div class="input-group shadow">
  <input type="text" class="form-control input-text-shadow link-input" placeholder="输入您的链接" v-model="link.url">
  <div class="input-group-addon link-input-option"><label><input type="checkbox" v-model="link.isNewTab"> 新窗口</label></div>
  <!-- <div class="input-group-addon link-input-option"><label><input type="checkbox" v-model="link.isTrack"> 追踪</label></div> -->
  <div class="input-group-addon link-input-option btn btn-danger" v-show="linkObj.url" @click="removeLink">取消链接</div>
  <div class="input-group-btn"><div class="btn btn-success" title="完成" @click="editDone">完成</div></div>
</div>
</template>

<style>
.link-input{
  min-width:250px;
}

.link-input-option{
  border-left:0!important;
}

.link-input-option label{
  margin:0;
  cursor: pointer;
  font-weight: normal;
}
</style>