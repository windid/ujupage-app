<script>

</script>

<template>
  <div class="preview-header">
    <div class="home">
      <router-link to="/" class="home-link">
        <span class="glyphicon glyphicon-home"></span>
      </router-link>
    </div>

    <ab-test></ab-test>

    <div class="btn-group">
      <div class="btn btn-default" :class="{ active: workspace.version === 'pc' }" @click="switchVersion('pc')">
        桌面版 <span class="glyphicon glyphicon-blackboard"></span>
      </div>
      <div class="btn btn-default" :class="{ active: workspace.version === 'mobile' }" @click="switchVersion('mobile')">
        移动版 <span class="glyphicon glyphicon-phone"></span>
      </div>
    </div>

    <div class="btn-toolbar fr">
      <div class="btn-group">
        <div class="btn btn-default">
          <span class="glyphicon glyphicon-question-sign"></span>
        </div>
      </div>
    </div>
  </div>
</template>