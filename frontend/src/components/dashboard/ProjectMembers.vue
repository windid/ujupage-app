<script>
  import Avatar from './Avatar'
  import { Tooltip } from 'element-ui'
  import { mapGetters } from 'vuex'
  export default {
    components: {
      Avatar,
      Tooltip
    },
    computed: {
      ...mapGetters({
        members: 'projectMembers'
      })
    },
    methods: {
      invite () {
        this.$store.dispatch('getInput', {
          header: '请输入新成员的邮箱地址',
          onConfirm: (email) => {
            const member = {
              email: email
            }
            this.$store.dispatch('inviteMember', member)
          }
        })
      }
    }
  }
</script>
<template>
  <div style="float: right;">
    <avatar v-for="member in members" :member="member" :key="member.email" class="avatar"></avatar>
    <tooltip content="邀请新成员" class="avatar invite-btn" @click="invite">+</tooltip>
  </div>
</template>

<style>
  .avatar {
    display: inline-block;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    overflow: hidden;
    margin-left: 6px;
    line-height: 34px;
    font-size: 12px;
    text-align: center;
    color: #666;
    cursor: pointer;
    box-shadow: 0 0 8px #ddd;
  }

  .avatar:hover {
    border-color: #bbb;
  }

  .invite-btn {

  }
</style>