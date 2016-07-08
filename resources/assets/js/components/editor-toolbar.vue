<template>
  <div class="toolbar shadow">
    <div class="toolbar-header">组件</div>
    <div class="toolbar-body">
      <div v-for="item in list" class="tool shadow" @click="item.action">
        <span class="glyphicon glyphicon-{{item.style}}"></span>
        <div class="tool-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { addSection }  from '../store/actions'
export default {
  name: 'editorToolbar',
  vuex: {
    actions:{
      addSection
    }
  },
  data () {
    return {
      list: [
        {
          name:'版块',
          style:'modal-window',
          action:this.addSection
        },
        {
          name:'图片',
          style:'picture',
          action:function(){
            console.log(this);
          }
        },
        {
          name:'文字',
          style:'font',
          action:function(){
            
          }
        },
        {
          name:'按钮',
          style:'expand',
          action:function(){
            
          }
        },
        // {
        //   name:'视频',
        //   style:'facetime-video',
        //   action:function(){
            
        //   }
        // },
        /*
        {
          name:'形状',
          'style':'stop',
          action:function(){

          }
        },
        */
        {
          name:'表单',
          style:'edit',
          action:function(){
            
          }
        }
      ]
    }
  }
}
</script>