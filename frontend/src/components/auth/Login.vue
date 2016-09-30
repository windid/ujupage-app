<script>
import Auth from './Auth'
import { mapActions } from 'vuex'

export default {
  components: {
    Auth
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    ...mapActions({
      login: 'login'
    }),
    formSubmit (e) {
      const email = e.target.email.value
      const password = e.target.password.value
      if (!email) {
        this.error = '请输入您的用户名'
        return
      }
      if (!password) {
        this.error = '请输入您的密码'
        return
      }
      this.login([email, password, () => {
        // this.$router.replace(this.$route.query.redirect || '/')
      }, (error) => {
        console.log(error)
        this.error = error
      }])
    }
  }
}

</script>

<template>
<auth>
  <span slot="title">登陆</span>
  <div slot="content">
    <form action="" @submit.prevent="formSubmit" method="post">
      <div class="form-group">
        <input class="form-control input-lg" type="text" name="email" value="" placeholder="邮箱"/>        
      </div>
      <div class="form-group">
        <input class="form-control input-lg" type="password" name="password" value="" placeholder="密码"/>
      </div>
      <div class="form-group">
        <label><input type="checkbox" name="remember" value="1" /> 在本机保持我的登陆状态</label>
      </div>
      <div class="form-group">
        <input type="submit" value="登陆" class="btn btn-primary btn-lg form-control input-lg" />  
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