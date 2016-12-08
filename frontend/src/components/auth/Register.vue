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
    ...mapActions(['register', 'loading', 'loadingDone']),
    formSubmit (e) {
      const name = e.target.name.value
      const email = e.target.email.value
      const password = e.target.password.value
      const passwordConfirmation = e.target.password_confirmation.value

      this.error = ''

      if (!name) {
        this.error = '请输入您的姓名！'
        return
      }
      if (name.length > 20) {
        this.error = '姓名长度不能超过20个字符'
        return
      }
      const emailPattern = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z0-9]{2,5}$/
      if (!emailPattern.test(email)) {
        this.error = '邮箱地址格式不正确。'
        return
      }
      if (password.length < 6) {
        this.error = '密码长度至少要6位。'
        return
      }
      if (password !== passwordConfirmation) {
        this.error = '两次输入的密码不一致。'
        return
      }
      const user = {
        name: name,
        email: email,
        password: password
      }
      this.loading()
      this.register([user, () => {
        this.loadingDone()
        this.$router.replace(this.$route.query.redirect || '/')
      }, (response) => {
        this.loadingDone()
        if (response.status === 422) {
          this.error = '您输入的邮箱已经注册过了。'
          return
        } else {
          this.error = '注册失败，请稍后再试。'
          return
        }
      }])
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
    <form action="" @submit.prevent="formSubmit" method="post">
      <div class="form-group">
        <input class="form-control input-lg" type="text" name="name" placeholder="姓名"/>        
      </div>
      <div class="form-group">
        <input class="form-control input-lg" type="text" name="email" placeholder="电子邮箱"/>        
      </div>
      <div class="form-group">
        <input class="form-control input-lg" type="password" name="password" placeholder="密码"/>
      </div> 
      <div class="form-group">
        <input class="form-control input-lg" type="password" name="password_confirmation" placeholder="确认密码"/>
      </div>
      
      <p class="auth-error bg-danger" v-show="!!error">{{error}}</p>

      <div class="form-group">
          <input type="submit" value="注册" class="btn btn-primary btn-lg form-control input-lg" />  
      </div>
    </form>
  </div>
  <p slot="extra">
    已经有聚页账户？
    <router-link to="/login">登陆</router-link>
  </p>
</auth>
</template>