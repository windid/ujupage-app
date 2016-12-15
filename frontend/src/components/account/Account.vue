<script>
import { Tooltip, Button, Loading, Message } from 'element-ui'
import API from '../../API'
import { mapActions } from 'vuex'

export default {
  components: {
    Tooltip,
    'el-button': Button
  },
  data () {
    return {
      changePassword: false,
      user: { ...this.$store.state.user.current },
      uploading: false,
      messages: {
        avatarTooSmall: {
          type: 'warning',
          content: '图片宽度和高度不能小于160像素'
        },
        fieldEmpty: (name) => ({
          type: 'warning',
          content: name + '不能为空'
        }),
        passNotMatch: {
          type: 'error',
          content: '两次输入的新密码不相同'
        },
        editSuccess: {
          type: 'success',
          content: '用户信息已修改成功'
        },
        authFail: {
          type: 'error',
          content: '用户验证失败'
        },
        avatarFail: {
          type: 'error',
          content: '用户头像修改失败'
        }
      },
      oldPassword: '',
      newPassword: '',
      newPassword2: ''
    }
  },
  computed: {
    avatarClip () {
      if (this.user && this.user.avatar) {
        return this.user.avatar + '?x-oss-process=image/resize,m_fill,h_120,w_120'
      }
      return null
    }
  },
  created () {
    document.title = '我的账号 - 聚页'
  },
  mounted () {
    this.$refs.file.addEventListener('change', this.avatarLoad)
  },
  methods: {
    ...mapActions([
      'editUser'
    ]),
    editDone () {
      this.editUser(this.user)
    },
    avatarSelect () {
      this.$refs.file.value = null
      this.$refs.file.click()
    },
    avatarLoad (event) {
      const image = this.$refs.file.files[0]
      var img = document.createElement('img')
      img.onload = () => {
        const width = img.naturalWidth || img.width
        const height = img.naturalHeight || img.height
        if (width < 160 || height < 160) {
          // 如果图片尺寸太小
          this.showDialog(this.messages.avatarTooSmall)
        } else {
          const data = new window.FormData()
          data.append('avatar', image)
          const loader = Loading.service({
            fullscreen: false,
            text: '正在上传',
            target: this.$refs.avatar
          })
          API.user.edit(data).then(
          response => {
            if (response.ok) {
              const url = response.body.avatar
              if (url && typeof url === 'string' && url.length > 0) {
                this.user.avatar = url
                this.editDone()
              }
            } else {
              this.showDialog(this.messages.avatarFail)
            }
            loader.close()
          },
          response => {
            // failed
            loader.close()
            console.error('用户头像上传失败')
            this.showDialog(this.messages.avatarFail)
          })
        }
      }
      const URL = window.URL || window.webkitURL
      img.src = URL.createObjectURL(image)
    },
    showDialog (message) {
      Message[message.type]({
        message: message.content,
        showClose: true
      })
    },
    save () {
      const isEmpty = (str) => typeof str === 'string' && str.length <= 0

      const data = new window.FormData()
      const name = this.user.name
      if (isEmpty(name)) {
        this.showDialog(this.messages.fieldEmpty('用户名'))
        return
      }
      if (this.changePassword) {
        if (isEmpty(this.oldPassword)) {
          this.showDialog(this.messages.fieldEmpty('旧密码'))
          return
        }
        if (isEmpty(this.newPassword) || isEmpty(this.newPassword2)) {
          this.showDialog(this.messages.fieldEmpty('新密码'))
          return
        }
        if (this.newPassword !== this.newPassword2) {
          this.showDialog(this.messages.passNotMatch)
          return
        }
        data.append('old_password', this.oldPassword)
        data.append('password', this.newPassword)
        data.append('password_confirmation', this.newPassword2)
      }
      data.append('name', name)
      API.user.edit(data).then(
      response => {
        if (response.ok) {
          this.showDialog(this.messages.editSuccess)
          this.user = response.body
          this.editDone()
        }
      },
      response => {
        if (response.status === 401) {
          this.showDialog(this.messages.authFail)
        }
      })
    }
  },
  watch: {
    '$store.state.user.current': function (val) {
      this.user = { ...val }
    }
  }
}
</script>

<template>
  <div>
    <div class="content-header">
      <h4>我的帐号</h4>
    </div>
    <div class="content-body container-fluid">
      <div class="row">
        <div class="col-md-2">
          <div class="avatar-wrapper" @click="avatarSelect" ref="avatar">
            <tooltip content="设置头像" class="avatar">
              <img v-if="avatarClip" :src="avatarClip" />
              <span v-else class="glyphicon glyphicon-user"></span>
            </tooltip>
            <form hidden class="hidden"  enctype="multipart/form-data">
              <input type="file" ref="file" accept="image/x-png,image/jpg,image/jpeg"></input>
            </form>
          </div>
        </div>
        <div class="col-md-4">
          <!-- <h5>注册于</h5>
          <p class="text-user-info"><i>2016-12-12</i></p>
          <h5>最后登陆于</h5>
          <p class="text-user-info"><i>2016-12-12 12:12:12</i></p>
          <p class="text-user-info"><i>IP: 192.168.0.123</i></p> -->
        </div>
        <div class="col-md-3">
          <form role="form" @submit.prevent>
            <div class="form-group">
              <label for="name-input">名字</label>
              <input type="text" class="form-control" id="name-input" name="username" v-model="user.name">
            </div>
            <div class="form-group">
              <label for="login-email">登陆邮箱</label>
              <input type="email" class="form-control" id="login-email" :value="user.email" disabled>
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="changePassword"> 修改密码
              </label>
            </div>
            <template v-if="changePassword">
              <div class="form-group">
                <input type="password" class="form-control" placeholder="旧密码" name="old-password" v-model="oldPassword">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="新密码" name="new-password" v-model="newPassword">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" placeholder="再次输入新密码" name="confirm-password" v-model="newPassword2">
              </div>
            </template>
            <button type="submit" class="btn btn-success" @click.stop="save">保存</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar-wrapper {
  margin: 0 0 0 15px;
}
.avatar {
  width: 120px;
  height: 120px;
  margin: 0;
  background: #f9f9f9;
  font-size: 60px;
  line-height: 120px;
  color: #ccc;
}
.avatar img {
  padding: 0;
  margin: 0;
  display: block;
}
.text-user-info {
  color: #999;
  padding-left: 20px;
}
</style>