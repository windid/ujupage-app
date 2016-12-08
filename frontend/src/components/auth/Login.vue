<script>
import Auth from './Auth'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    Auth
  },
  data () {
    return {
      error: ''
    }
  },
  methods: {
    ...mapActions(['login', 'loading', 'loadingDone']),
    formSubmit (e) {
      const email = e.target.email.value
      const password = e.target.password.value
      const remember = e.target.remember.checked
      if (!email) {
        this.error = '请输入您的电子邮件'
        return
      }
      if (!password) {
        this.error = '请输入您的密码'
        return
      }
      this.loading()
      this.login([email, password, remember, () => {
        this.loadingDone()
        this.$router.replace(this.$route.query.redirect || '/')
      }, (response) => {
        this.loadingDone()
        switch (response.status) {
          case 401:
            this.error = '密码错误！'
            break
          case 422:
            this.error = '帐号错误！'
            break
          default:
            this.error = '登陆失败！'
            break
        }
      }])
    }
  },
  mounted () {
    document.title = '登陆 - 聚页'
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
      <p class="auth-error bg-danger" v-show="!!error">{{error}}</p>
      <div class="form-group">
        <input type="submit" value="登陆" class="btn btn-primary btn-lg form-control input-lg" />  
      </div>
    </form>
    <div><router-link to="/forgetpassword">忘记密码？</router-link></div>
  </div>
  <p slot="extra">
    还没有聚页账户？
    <router-link to="/register">注册用户</router-link>
  </p>
</auth>
</template>