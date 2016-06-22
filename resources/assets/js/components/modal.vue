<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    width: {
      type: String,
    	default: "500px"
    },
    height: {
      type: String,
    	default: "auto"
    }
  },
  data (){
    return {
      bodyHeight:"auto"
    }
  },
  methods:{
  	stopPropagation: function(event){
  		event.stopPropagation()
  	}
  },
  ready:function(){
    //如果传入的高度是百分比，根据用户浏览器高度转化为像素
    var heightUnit = this.height.substr(this.height.length-1)
    if (heightUnit === '%'){
      var browserHeight = document.documentElement.clientHeight;
      var modalHeight = parseInt( browserHeight * parseInt(this.height) / 100 );
      this.bodyHeight = (modalHeight - 107) + 'px'
    } else {
      this.bodyHeight = this.height;
    }
  // 	document.body.style.overflow = 'hidden';
  //  document.body.style['margin-right'] = '15px';
  },
  // destroyed:function(){
  //   document.body.style.overflow = 'auto';
  //   document.body.style['margin-right'] = '0';
  // }
}
</script>

<template>
  <div class="modal-mask" transition="modal" @click="show=false">
    <div class="modal-wrapper">
      <div class="modal-container" :style="{width:width}" @click="stopPropagation">
        

        <div class="modal-header">
          <button type="button" class="close fr" aria-label="Close" @click="show = false"><span aria-hidden="true">&times;</span></button>
          <slot name="header">
          </slot>
        </div>
        
        <div class="modal-body" :style="{height:bodyHeight}">
          <slot name="body">
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="btn btn-primary btn-sm" @click="show = false">确定</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 820000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  height: 100%;
}

.modal-container {
  position: relative;
  margin: 0 auto;
  margin-top:45px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

.modal-header {
  height: 65px;
  padding:12px;
}

.modal-body {
  padding:12px;
  background: #eee;
  border:1px solid #ccc;
  overflow-x: auto;
  position: relative;
}

.modal-footer{
  padding:12px;
  height: 54px;
  text-align: right;
}

/*
 * the following styles are auto-applied to elements with
 * v-transition="modal" when their visiblity is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  margin-top:0px;
}
</style>