<script>
import Auth from './Auth'
import { mapActions } from 'vuex'
import { emailRE } from '../../utils'

export default {
  components: {
    Auth
  },
  data () {
    return {
      error: '',
      emailSent: false
    }
  },
  methods: {
    ...mapActions(['forgetPassword', 'loading', 'loadingDone']),
    formSubmit (e) {
      const email = e.target.email.value
      if (!emailRE.test(email)) {
        this.error = '请输入正确的邮箱地址'
        return
      }
      this.loading()
      this.forgetPassword(email).then(() => {
        this.loadingDone()
        this.emailSent = true
      }).catch(err => {
        if (err.status === 404) {
          this.error = '您输入的邮箱尚未注册。'
        }
        this.loadingDone()
      })
    }
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
    <form v-if="!emailSent" action="" @submit.prevent="formSubmit" method="post">
      <div class="form-group">
        <input class="form-control input-lg" type="text" name="email" value="" placeholder="邮箱"/>        
      </div>
      <p class="auth-error bg-danger" v-show="!!error">{{error}}</p>
      <div class="form-group">
        <input type="submit" value="发送密码重设邮件" class="btn btn-primary btn-lg form-control input-lg" />  
      </div>
    </form>
    <p class="auth-info bg-info" v-if="emailSent">
      一封包含密码重置链接的验证邮件已经发送到您的注册邮箱，请按照邮件中的说明进行下一步的操作。
    </p>
  </div>
  <p slot="extra">
    已经有聚页账户？
    <router-link to="/login">登陆</router-link>
  </p>
</auth>
</template>