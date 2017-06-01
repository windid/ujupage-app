<template>
<div>
  <div class="auth-container">
    <div class="auth-header">
      <slot name="title"></slot>
    </div>
    <div class="auth-content">
      <slot name="content"></slot>
    </div>
  </div>
  <div class="auth-extra">
    <slot name="extra"></slot>
  </div>
</div>
</template>

<style>
.auth-container {
  margin: 50px auto;
  width: 500px;
  border: 1px solid #eee;
  padding: 40px 90px;
  border-radius: 8px;
  box-shadow: 0 2px 20px #ddd;
  background: #fff;
}

.auth-header {
  padding-bottom: 40px;
  font-size: 24px;
  text-align: center;
}

.auth-error {
  padding: 8px;
  border-radius: 5px;
}

.auth-extra {
  text-align: center;
  color: #bbb;
}

.auth-info {
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.auth-content label{
  font-weight: normal;
}
</style>