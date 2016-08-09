<script>
  import eventHandler from '../utils/eventHandler'
  export default {
    props: {
      show: Boolean,

      //向上还是向下弹出菜单，默认向下，向上用up
      dir:{
        type: String,
        default:'down'
      }
    },
    methods: {
      toggleDropdown(e) {
        e.preventDefault()
        this.$emit('toggle')
      }
    },
    mounted() {
      const el = this.$el
      const toggle = el.querySelector('[data-toggle="dropdown"]')
      if (toggle){
        toggle.addEventListener('click', this.toggleDropdown)
      }
      this._closeEvent = eventHandler.listen(window, 'click', (e)=> {
        if (!el.contains(e.target) && this.show){
          this.toggleDropdown(e);
        }
      })
    },
    beforeDestroy() {
      if (this._closeEvent) this._closeEvent.remove()
    }
  }
</script>

<template>
  <div class="btn-group" v-bind:class="{open:show,dropup:(dir === 'up')}">
    <slot></slot>
    <slot name="dropdown-menu"></slot>
  </div>
</template>

<style>
  .dropdown-enter-active, .dropdown-leave-active {
    transition: all .3s ease;
    overflow: hidden;
  }
  .dropdown-enter, .dropdown-leave-active {
    opacity: 0
  }
</style>