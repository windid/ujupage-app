<style>

</style>

<template>
  <sidebar :show.sync="show">
    
    <div slot="header">
      <button class="btn btn-success btn" @click="closeSidebar">&nbsp; 完成 &nbsp;</button>
      <h5 class="fr">修改板块背景</h5>
    </div>
    <div slot="body" class="container-fluid">
      <div class="row">
        <div class="col-xs-5"><color-picker :color.sync="backgroundColor"></color-picker></div>
        <div class="col-xs-7">背景颜色</div>
      </div>
      <div class="row">
        <div class="col-xs-12">背景图片</div>
      </div>
    </div>
      
  </sidebar>
</template>

<script>
import { setActiveSectionId }  from '../store/actions'
import { getWorkspaceData } from '../store/getters'
import sidebar from './sidebar.vue'
import colorPicker from './color-picker.vue'
import colorMixin from '../mixins/colorMixin.js'

export default {
  name:'sectionEdit',
  mixins: [colorMixin],
  components: {
    sidebar,
    colorPicker
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  },
  data (){
    return {
      backgroundColor:"0"
    }
  },
  methods:{
    closeSidebar: function(){
      this.show = false;
      this.setActiveSectionId(null);
    }
  },
  vuex: {
    actions: {
      setActiveSectionId
    },
    getters: {
      workspace: getWorkspaceData
    }
  }
}
</script>