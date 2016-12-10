<script>
import { Tooltip } from 'element-ui'

export default {
  components: {
    Tooltip
  },
  data () {
    return {
      changePassword: false,
      user: { ...this.$store.state.user.current }
    }
  },
  created () {
    document.title = '我的账号 - 聚页'
  }
}
</script>

<template>
  <div>
    <div class="content-header">
      <h4>我的帐号</h4>
    </div>
    <div class="content-body container-fluid">
      <div class="row">
        <div class="col-md-2">
          <tooltip content="设置头像" class="avatar">
            <span class="glyphicon glyphicon-user"></span>
          </tooltip>
        </div>
        <div class="col-md-4">
          <h5>注册于</h5>
          <p class="text-user-info"><i>2016-12-12</i></p>
          <h5>最后登陆于</h5>
          <p class="text-user-info"><i>2016-12-12 12:12:12</i></p>
          <p class="text-user-info"><i>IP: 192.168.0.123</i></p>
        </div>
        <div class="col-md-3">
          <form role="form" @submit.prevent>
            <div class="form-group">
              <label for="name-input">名字</label>
              <input type="text" class="form-control" id="name-input" name="username" v-model="user.name">
            </div>
            <div class="form-group">
              <label for="login-email">登陆邮箱</label>
              <input type="email" class="form-control" id="login-email" :value="user.email" disabled>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="changePassword"> 修改密码
              </label>
            </div>
            <template v-if="changePassword">
              <div class="form-group">
                <input type="password" class="form-control" placeholder="旧密码" name="old-password">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="新密码" name="new-password">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="再次输入新密码" name="confirm-password">
              </div>
            </template>
            <button type="submit" class="btn btn-success">保存</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  width: 120px;
  height: 120px;
  margin: 0 15px;
  background: #f9f9f9;
  font-size: 60px;
  line-height: 120px;
  color: #ccc;
}
.text-user-info {
  color: #999;
  padding-left: 20px;
}
</style>