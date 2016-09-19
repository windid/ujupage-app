<script>
export default {
  data () {
    return {
      tools: [
        {
          name: '版块',
          style: 'modal-window',
          action: this.addSection
        },
        {
          name: '图片',
          style: 'picture',
          action: this.addImage
        },
        {
          name: '文字',
          style: 'font',
          action: this.addText
        },
        {
          name: '按钮',
          style: 'expand',
          action: this.addButton
        },
        // {
        //   name: '视频',
        //   style: 'facetime-video',
        //   action: function(){
        //   }
        // },
        /*
        {
          name: '形状',
          'style':'stop',
          action: function(){

          }
        },
        */
        {
          name: '表单',
          style: 'edit',
          action: this.addForm
        },
        {
          name: 'HTML',
          style: 'header',
          action: this.addHTML
        }
      ]
    }
  }
}

</script>
<template>
  <div class="toolbar shadow">
    <div class="toolbar-header">组件</div>
    <div class="toolbar-body">
      <div v-for="tool in tools" class="tool shadow" @click.stop="tool.action">
        <span class="glyphicon" :class="'glyphicon-' + tool.style"></span>
        <div class="tool-name">{{tool.name}}</div>
      </div>
    </div>
  </div>
</template>

<style>
.toolbar{
  position:fixed;
  z-index: 1000000;
  width: 86px;
  text-align: center;
  top: 60px;
  left: 10px;
  border-radius: 10px;
  box-shadow: 0 0 8px #ddd;
}


.toolbar-header{
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  background-color: #555;
  line-height: 35px;
  color: #fff;
}

.toolbar-body{
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border:1px solid #ccc;
  background-color:#fff;
  padding:10px;
}

.tool{
  width: 66px;
  height: 66px;
  margin-top:10px;
  padding:4px;
  border:5px solid #BEE1F1;
  border-radius: 33px;
  cursor:pointer;
  font-size:12px;
  color:#333;
  box-shadow: 0 0 8px #ddd;
}

.tool:hover{
  border-color:#98CFE9;
  color:#333;
}

.tool span{
  color:#337ab7;
  font-size:24px;
}

.tool-name{
  border-top:1px solid #BEE1F1;
  margin:1px;
}

</style>