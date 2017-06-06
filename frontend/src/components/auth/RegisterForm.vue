<template>
  <form action="" @submit.prevent="formSubmit" method="post">
    <div class="form-group">
      <input class="form-control input-lg" type="text" name="name" placeholder="姓名"/>        
    </div>
    <div class="form-group">
      <input class="form-control input-lg" type="text" name="email" :value="invitedEmail" placeholder="电子邮箱" :disabled="!!invitedEmail"/>
    </div>
    <div class="form-group">
      <input class="form-control input-lg" type="password" name="password" placeholder="密码"/>
    </div>
    <!-- <div class="form-group">
      <input class="form-control input-lg" type="password" name="password_confirmation" placeholder="确认密码"/>
    </div> -->
    <p class="auth-error bg-danger" v-show="!!error">{{error}}</p>
    <div class="form-group">
      <input type="submit" value="注册" class="btn btn-primary btn-lg form-control input-lg" />  
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { emailRE } from 'utils/index'

export default {
  data () {
    return {
      error: '',
      token: this.$route.query.token || '',
      invitedEmail: this.$route.query.email || ''
    }
  },
  methods: {
    ...mapActions(['register', 'loading', 'loadingDone']),
    formSubmit (e) {
      const name = e.target.name.value
      const email = e.target.email.value
      const password = e.target.password.value
      // const passwordConfirmation = e.target.password_confirmation.value

      this.error = ''

      if (!name) {
        this.error = '请输入您的姓名！'
      }
      if (name.length > 20) {
        this.error = '姓名长度不能超过20个字符'
      }
      if (!email) {
        this.error = '请输入邮箱地址'
      }
      // const emailPattern = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/
      if (!emailRE.test(email)) {
        this.error = '邮箱地址格式不正确。'
      }
      if (password.length < 6) {
        this.error = '密码长度至少要6位。'
      }
      // if (password !== passwordConfirmation) {
      //   this.error = '两次输入的密码不一致。'
      //   return
      // }

      if (this.error) {
        this.$emit('fail', this.error)
        return
      }

      const user = {
        name,
        email,
        password,
        i: this.token
      }
      this.loading()
      this.register(user).then(res => {
        this.$emit('pass', res)
      }).catch(err => {
        if (err.status === 422) {
          this.error = '您输入的邮箱已经注册过了。'
        } else {
          this.error = '注册失败，请稍后再试。'
        }
        this.$emit('fail', err)
      }).finally(() => {
        this.loadingDone()
      })
    }
  },
  mounted () {
    document.title = '注册 - 聚页'
  }
}
</script>