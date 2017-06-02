<script>
import Auth from './Auth'
import RegisterForm from './RegisterForm'

export default {
  components: {
    Auth,
    RegisterForm
  },
  methods: {
    onPass () {
      this.$router.replace('/')
    }
  },
  mounted () {
    document.title = '注册 - 聚页'
  }
}

</script>

<template>
<auth>
  <span slot="title">注册</span>
  <div slot="content">
    <register-form @pass="onPass"></register-form>
  </div>
  <p slot="extra">
    已经有聚页账户？
    <router-link to="/login">登陆</router-link>
  </p>
</auth>
</template>