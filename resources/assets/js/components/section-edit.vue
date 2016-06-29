<style>
.sidebar-block{
  padding:10px 0;
  border-bottom:1px solid #ddd;
}
.sidebar-block-inside{
  padding-top:10px;
}
.border-width{
  height: 30px;
  border:2px solid #ddd;
  text-align: center;
  border-radius: 4px;
  width:60px;
}
</style>

<template>
  <sidebar :show.sync="show">
    
    <div slot="header">
      <button class="btn btn-success" @click="sectionEditDone">&nbsp; 完成 &nbsp;</button>
      <!-- <tooltip placement="left" content="同时修改桌面版和移动版">
        <h5 class="fr"><label><input type="checkbox"> 同步</label></h5>
      </tooltip> -->
    </div>
    <div slot="body">
      <div class="sidebar-block">
        <color-picker :color.sync="style['background-color']"></color-picker> &nbsp; 背景颜色
      </div>
      <div class="sidebar-block">
        <div><color-picker :color.sync="style['border-color']"></color-picker> &nbsp; 边框颜色</div>
        <div class="sidebar-block-inside"><input type="text" class="border-width" v-model="style['border-width']"> &nbsp; 边框尺寸</div>
      </div>
    </div>
      
  </sidebar>
</template>

<script>
import { setActiveSectionId,modifySection }  from '../store/actions'
import { getWorkspaceData,getSections } from '../store/getters'
import sidebar from './sidebar.vue'
import colorPicker from './color-picker.vue'
import colorMixin from '../mixins/colorMixin.js'
// import { tooltip } from '../libs/vue-strap'

export default {
  name:'sectionEdit',
  mixins: [colorMixin],
  components: {
    sidebar,
    colorPicker,
    // tooltip
  },
  props: {
    sectionId: {
      required: true
    }
  },
  data (){
    return {
      backgroundColor:"0",
      show:true,
      style:{}
      // style:this.sections[this.sectionId]['style'][this.workspace.version]
      //section: this.sections[this.workspace.activeSectionId]
    }
  },
  // computed: {
  //   style: function(){
  //     if (this.sectionId){
  //       return this.sections[this.sectionId]['style'][this.workspace.version]
  //     } else {
  //       return {}
  //     }
  //   }
  // },
  watch: {
    'style': {
      handler: function(newStyle,oldStyle){
        if (oldStyle.height){
          this.modifySection(this.sectionId,newStyle);
        }
      },
      deep:true
    }
  },
  methods: {
    sectionEditDone: function(){
      this.show = false;
      this.setActiveSectionId(null);
    }
  },
  vuex: {
    actions: {
      setActiveSectionId,
      modifySection
    },
    getters: {
      workspace: getWorkspaceData,
      sections: getSections
    }
  },
  ready: function(){
    this.style = this.sections[this.sectionId]['style'][this.workspace.version]
  }
}
</script>