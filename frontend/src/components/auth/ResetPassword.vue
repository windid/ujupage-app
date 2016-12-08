<script>
import Auth from './Auth'
import { mapActions } from 'vuex'

export default {
  components: {
    Auth
  },
  data () {
    return {
      error: '',
      success: false
    }
  },
  methods: {
    ...mapActions(['resetPassword', 'loading', 'loadingDone']),
    formSubmit (e) {
      const password = e.target.new_password.value
      const passwordConfirmation = e.target.password_confirmation.value
      const token = this.$route.params.token
      this.error = ''
      if (password.length < 6) {
        this.error = '密码长度至少要6位。'
        return
      }
      if (password !== passwordConfirmation) {
        this.error = '两次输入的密码不一致。'
        return
      }
      this.loading()
      this.resetPassword([token, password, () => {
        this.loadingDone()
        this.success = true
      }, (response) => {
        this.loadingDone()
        this.error = response.error
      }])
    }
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
    <form v-if="!success" action="" method="post" @submit.prevent="formSubmit">
      <div class="form-group">
        <input class="form-control input-lg" type="password" name="new_password" placeholder="新密码"/>
      </div> 
      <div class="form-group">
        <input class="form-control input-lg" type="password" name="password_confirmation" placeholder="确认新密码"/>
      </div>

      <p class="auth-error bg-danger" v-show="!!error">{{error}}</p>

      <div class="form-group">
        <input type="submit" value="修改密码" class="btn btn-primary btn-lg form-control input-lg" />  
      </div>
    </form>
    <p class="auth-info bg-info" v-if="success">
      密码重设成功！请记住您的新密码，现在您可以<a href="/">登陆</a>。
    </p>
  </div>
  <p v-if="!success" slot="extra">
    已经有聚页账户？
    <router-link to="/login">登陆</router-link>
  </p>
</auth>
</template>