<script>
  import eventHandler from '../../utils/eventHandler'
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true
      },
      //向上还是向下弹出菜单，默认向下，向上用up
      dir:{
        type: String,
        default:'down'
      }
    },
    methods: {
      toggleDropdown(e) {
        e.preventDefault()
        this.show = !this.show
      }
    },
    ready() {
      const el = this.$el
      const toggle = el.querySelector('[data-toggle="dropdown"]')
      if (toggle)
      {
        // toggle.style.borderRadius = '4px'
        toggle.addEventListener('click', this.toggleDropdown)
      }
      this._closeEvent = eventHandler.listen(window, 'click', (e)=> {
        if (!el.contains(e.target) || e.target.nodeName.toLowerCase() == 'a') this.show = false
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
.dropdown-menu-narrow{
  min-width:52px;
}

.dropdown-menu-narrow li{
  text-align: center;
  border-bottom: 1px solid #eee;
  line-height: 32px;
  cursor: pointer;
}

.dropdown-menu-narrow li:last-child{
  border: 0;
}

.dropdown-menu-narrow li.selected, .dropdown-menu-narrow li:hover{
  background-color:#eee;
}
</style>