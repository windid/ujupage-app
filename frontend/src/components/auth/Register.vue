<script>
import Auth from './Auth'
export default {
  components: {
    Auth
  }
}

</script>

<template>
<auth>
  <span slot="title">注册</span>
  <div slot="content">
    <form action="" method="post">
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
      
      <!-- @foreach ($errors->all() as $v)            
       <p class="text-danger">{{$v}}</p>
      @endforeach -->
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