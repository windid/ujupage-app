<template>
<div class="header">
  <ul class="header-holder list-inline fl">
    <li class="go-to-dashboard"><a href="./dashboard"><span class="glyphicon glyphicon-home"></span></a></li>
    <li><a>创建一个A/B测试</a></li>
  </ul>
  <div class="btn-group btn-group-sm version-switch" role="group" aria-label="...">
    <button type="button" class="btn btn-default" ms-class="active:avalon.vmodels.page._version == 0" ms-click="avalon.vmodels.page.setVersion(0)">桌面 <span class="glyphicon glyphicon-blackboard"></span></button>
    <button type="button" class="btn btn-default" ms-class="active:avalon.vmodels.page._version == 1" ms-click="avalon.vmodels.page.setVersion(1)">移动 <span class="glyphicon glyphicon-phone"></span></button>
  </div>
  <ul class="header-holder list-inline fr">
    <li><span class="glyphicon glyphicon-question-sign"></span></li>
    <li><span class="glyphicon glyphicon-share-alt flipx"></span></li>
    <li><span class="glyphicon glyphicon-share-alt"></span></li>
    <li>设置 <span class="glyphicon glyphicon-cog"></span></li>
    <li>保存 <span class="glyphicon glyphicon-floppy-disk"></span></li>
    <li>预览 <span class="glyphicon glyphicon-eye-open"></span></li>
    <li class="publish">发布 <span class="glyphicon glyphicon-send"></span></li>
  </ul>
</div>
</template>

<script>

export default {
  data () {
    return {
      
    }
  }
  
}
</script>
