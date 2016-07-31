<script>


export default {
  props: {
    pageItem:{
      type: Object
    }
  },
  data(){
    return {

    }
  }
}
</script>

<template>
  <div class="page-item">
    <div class="page-item-header">
      <a :href="'./editor/'+pageItem.id">{{pageItem.name}}</a>
    </div>
    <div class="page-item-body"></div>
    <div class="page-item-footer">
      <div class="btn-group fr">
        <div class="btn btn-default btn-sm">商机 <span class="glyphicon glyphicon-user"></span></div>
        <div class="btn btn-default btn-sm">分析 <span class="glyphicon glyphicon-signal"></span></div>
        <div class="btn btn-default btn-sm"><span class="glyphicon glyphicon-cog"></span> <span class="caret"></span></div>
      </div>
    </div>
  </div>
</template>

<style>
.page-item{
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 6px;
  height: 240px;
  box-shadow: 0 0 8px #ddd;
  float:left;
  margin:10px;
}

.page-item-header{
  position:relative;
  padding:11px;
  font-weight:bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.page-item-name{
  max-width: 150px;
}

.page-item-body{
  clear:both;
  height:150px;
  background:#f9f9f9;
  border-top:1px solid #eee;
  border-bottom:1px solid #eee;
}

.page-item-footer{
  padding:7px;
}
</style>