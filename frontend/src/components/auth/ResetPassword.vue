<script>
import Auth from './Auth'
export default {
  components: {
    Auth
  },
  mounted () {
    document.title = '修改密码 - 聚页'
  }
}

</script>

<template>
<auth>
  <span slot="title">修改密码</span>
  <div slot="content">
    <form action="" method="post">
      <p>帐号：</p>
      <input type="hidden" name="email" placeholder="邮箱"/>
      <div class="form-group">
        <input class="form-control input-lg" type="password" name="password" placeholder="新密码"/>
      </div> 
      <div class="form-group">
        <input class="form-control input-lg" type="password" name="password_confirmation" placeholder="确认新密码"/>
      </div> 
      <div class="form-group">
        <input type="submit" value="修改密码" class="btn btn-primary btn-lg form-control input-lg" />  
      </div>
    </form>
    <div><router-link to="/password">忘记密码？</router-link></div>
  </div>
  <p slot="extra">
    还没有聚页账户？
    <router-link to="/register">注册用户</router-link>
  </p>
</auth>
</template>