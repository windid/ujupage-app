<script>
  import Member from './Member'
  import { Tooltip } from 'element-ui'
  import { mapGetters } from 'vuex'
  import { emailRE } from '../../utils'

  export default {
    components: {
      Member,
      Tooltip
    },
    computed: {
      ...mapGetters({
        members: 'projectMembers',
        invited: 'projectMembersInvited',
        isAdmin: 'isProjectAdmin'
      })
    },
    methods: {
      invite () {
        this.$store.dispatch('getInput', {
          header: '请输入新成员的邮箱地址',
          inputAddon: '<span class="glyphicon glyphicon-user"></span>',
          onConfirm: (email) => {
            if (emailRE.test(email)) {
              const member = {
                email: email
              }
              this.$store.dispatch('inviteMember', member)
            } else {
              return '请输入正确的邮箱格式'
            }
          }
        })
      }
    }
  }
</script>
<template>
  <div style="float: right; margin: 10px 0">
    <member v-for="member in members" :member="member" class="avatar"></member>
    <member v-for="(email, id) in invited" :member="{id: id, email: email, name: email}" class="avatar invited"></member>
    <tooltip v-if="isAdmin" content="邀请新成员" class="avatar invite-btn" @click.native="invite">+</tooltip>
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

  .avatar.invited {
    border-style: dashed;
    background: #f9f9f9;
  }

  .invite-btn {

  }
</style>