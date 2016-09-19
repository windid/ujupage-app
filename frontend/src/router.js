import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

Vue.use(VueRouter)

const Editor = resolve => require(['./components/editor/Editor.vue'], resolve)
const Dashboard = resolve => require(['./components/dashboard/Dashboard.vue'], resolve)
const Account = resolve => require(['./components/account/Account.vue'], resolve)
const Stats = resolve => require(['./components/stats/Stats.vue'], resolve)

import Home from './components/common/Home'
import Login from './components/auth/Login'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/editor/:pageId', name: 'editor', component: Editor },
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Home,
      children: [
        { path: '', name: 'dashboard', component: Dashboard },
        { path: '/account', name: 'account', component: Account },
        { path: '/stats/:pageId', component: Stats },
        { path: '/stats/:pageId/:module', component: Stats }
      ]
    }
  ]
})

NProgress.configure({ showSpinner: false })

router.beforeEach((route, redirect, next) => {
  NProgress.start()
  next()
})

router.afterEach((route, redirect, next) => {
  NProgress.done()
})

export default router
