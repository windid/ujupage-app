<script>
import {  }  from '../store/actions'
import {  } from '../store/getters'
import modal from './modal.vue'
import pageAPI from '../../api/page'

export default {
  components: {
    modal
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true    
    }
  },
  data (){
    return {
      url:'',
      error: ''
    }
  },
  methods:{
    save: function(){
      if (this.url.length > 0){
        pageAPI.setUrl(window._pageInfo.pageId, this.url, data => {
          this.$dispatch('set-url',this.url);
          this.show = false;
        }, data => {
          this.error = data.err;
        });
      }
    }
  }
}
</script>

<template>
  <modal :show.sync="show" :width="'500px'" >
    <div slot="header">
      为您的页面选定一个URL地址
    </div>
    
    <div slot="body">
      <div class="input-group">
        <div class="input-group-addon">http://www.jueyepage.com/</div>
        <input type="text" class="form-control" v-model="url">
      </div>
      <div class="notice">
        <div class="text-danger">{{error}}</div>
        <div class="text-info">可由数字、字母组成，至少3位以上。</div>
      </div>
    </div>
    <div slot="footer">
      <button class="btn btn-success btn-sm" @click="save">确定</button>
    </div>
  </modal>
</template>

<style>
.notice{
  text-align:right;
}

</style>
