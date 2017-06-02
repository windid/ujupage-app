<script>
import Auth from './Auth'
import LoginForm from './LoginForm'

export default {
  name: 'Login',
  components: {
    Auth,
    LoginForm
  },
  methods: {
    onPass () {
      this.$router.replace(this.$route.query.redirect || '/')
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
    <login-form @pass="onPass"></login-form>
    <div><router-link to="/forgetpassword">忘记密码？</router-link></div>
  </div>
  <p slot="extra">
    还没有聚页账户？
    <router-link to="/register">注册用户</router-link>
  </p>
</auth>
</template>