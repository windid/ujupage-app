<template>
  <form @submit.prevent="formSubmit" method="post">
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
</template>

<script>
import { mapActions } from 'vuex'
import { emailRE } from 'utils/index'

export default {
  name: 'LoginForm',
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
      this.error = ''
      if (!email) {
        this.error = '请输入您的电子邮件'
      }
      if (!emailRE.test(email)) {
        this.error = '邮箱地址格式不正确。'
      }
      if (!password) {
        this.error = '请输入您的密码'
      }

      if (this.error) {
        this.$emit('fail', this.error)
        return
      }

      this.loading()
      this.login({ email, password, remember }).then(res => {
        this.$emit('pass', res)
      }).catch(err => {
        switch (err.status) {
          case 401:
            this.error = '密码错误！'
            break
          case 422:
            this.error = '帐号错误！'
            break
          default:
            this.error = '登陆失败！'
        }
        this.$emit('fail', err)
      }).finally(() => {
        this.loadingDone()
      })
    }
  }
}
</script>