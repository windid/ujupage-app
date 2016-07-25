<script>
import { setActiveSectionId,modifySection }  from '../store/actions'
import { getWorkspaceData,getSections } from '../store/getters'
import sidebar from './sidebar.vue'
import colorPicker from './color-picker.vue'
import colorMixin from '../mixins/colorMixin'
import eventHandler from '../../utils/eventHandler'
import { merge } from 'lodash'
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
    },
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  },
  data (){
    return {
      backgroundColor:"0",
      style:merge({},this.sections[this.sectionId]['style'])
    }
  },
  watch: {
    'style': {
      handler: function(newStyle,oldStyle){
        this.modifySection(this.sectionId,newStyle);
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
  ready(){
    var el = this.$el;
    this._closeEvent = eventHandler.listen(window, 'click', (e)=> {
      if (!el.contains(e.target)){
        this.sectionEditDone()
      }
    })
  },
  beforeDestroy() {
    if (this._closeEvent) this._closeEvent.remove()
  }
}
</script>

<template>
<div>
  <sidebar :show.sync="show">
    
    <div slot="header">
      <div class="btn btn-success" @click="sectionEditDone">&nbsp; 完成 &nbsp;</div>
      <!-- <tooltip placement="left" content="同时修改桌面版和移动版">
        <h5 class="fr"><label><input type="checkbox"> 同步</label></h5>
      </tooltip> -->
    </div>
    <div slot="body">
      <div class="sidebar-block">
        <color-picker :color.sync="style[workspace.version]['background-color']"></color-picker> &nbsp; 背景颜色
      </div>
      <div class="sidebar-block">
        <div><color-picker :color.sync="style[workspace.version]['border-color']"></color-picker> &nbsp; 边框颜色</div>
        <div class="sidebar-block-inside"><input type="text" class="border-width-input" v-model="style[workspace.version]['border-width']"> &nbsp; 边框尺寸</div>
      </div>
    </div>
      
  </sidebar>
</div>
</template>

<style>

.border-width-input{
  height: 30px;
  border:2px solid #ddd;
  text-align: center;
  border-radius: 4px;
  width:60px;
}
</style>