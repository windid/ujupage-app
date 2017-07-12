<template>
  <el-dialog v-model="showAuthDialog" size="tiny">
    <div v-if="showLogin">
      <div class="auth-header">登陆</div>
      <login-form @pass="onPass"></login-form>
      <p class="auth-extra">
        还没有聚页账户？
        <a href="javascript:;" @click="toggleForm">注册用户</a>
      </p>
    </div>
    <div v-else>
      <div class="auth-header">注册</div>
      <register-form @pass="onPass"></register-form>
      <p class="auth-extra">
        已经有聚页账户？
        <a href="javascript:;" @click="toggleForm">登陆</a>
      </p>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { Dialog } from 'element-ui'
import * as types from 'store/mutation-types'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default {
  name: 'AuthDialog',
  components: {
    ElDialog: Dialog,
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      showLogin: true
    }
  },
  computed: {
    ...mapGetters(['authDialog']),
    showAuthDialog: {
      get () {
        return this.authDialog.show
      },
      set (val) {
        this.$store.commit(types.SET_AUTH_DIALOG, val)
      }
    }
  },
  methods: {
    onPass () {
      this.$store.commit(types.SET_AUTH_DIALOG, false)
      this.authDialog.onPass()
    },
    toggleForm () {
      this.showLogin = !this.showLogin
    }
  }
}
</script>