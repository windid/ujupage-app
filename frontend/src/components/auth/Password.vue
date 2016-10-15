<script>
import Auth from './Auth'
export default {
  components: {
    Auth
  },
  mounted () {
    document.title = '密码重设 - 聚页'
  }
}

</script>

<template>
<auth>
  <span slot="title">密码重设</span>
  <div slot="content">
    <form action="" method="post">
      <div class="form-group">
        <input class="form-control input-lg" type="text" name="email" value="" placeholder="邮箱"/>        
      </div>
      <div class="form-group">
        <input type="submit" value="发送密码重设邮件" class="btn btn-primary btn-lg form-control input-lg" />  
      </div>
    </form>
  </div>
  <p slot="extra">
    已经有聚页账户？
    <router-link to="/login">登陆</router-link>
  </p>
</auth>
</template>