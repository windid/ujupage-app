import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from './store'

Vue.use(VueRouter)

const Editor = resolve => require(['./components/editor/Editor.vue'], resolve)
const Dashboard = resolve => require(['./components/dashboard/Dashboard.vue'], resolve)
const Account = resolve => require(['./components/account/Account.vue'], resolve)
const Stats = resolve => require(['./components/stats/Stats.vue'], resolve)
const Register = resolve => require(['./components/auth/Register.vue'], resolve)
const Password = resolve => require(['./components/auth/Password.vue'], resolve)
const ResetPassword = resolve => require(['./components/auth/ResetPassword.vue'], resolve)

import Home from './components/common/Home'
import Login from './components/auth/Login'

const requireAuth = (route, redirect, next) => {
  if (store.getters.isLogin) {
    console.log(redirect)
    redirect({
      path: '/login',
      query: { redirect: route.fullPath }
    })
  } else {
    next()
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/editor/:pageId', name: 'editor', component: Editor, beforeEnter: requireAuth },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/password', name: 'password', component: Password },
    { path: '/reset', name: 'resetpassword', component: ResetPassword },
    { path: '/', name: 'home', component: Home, beforeEnter: requireAuth,
      children: [
        { path: '', name: 'dashboard', component: Dashboard },
        { path: '/account', name: 'account', component: Account },
        { path: '/stats/:pageId/:module', name: 'stats', component: Stats }
      ]
    }
  ]
})

NProgress.configure({ showSpinner: false })

// router.beforeEach((route, redirect, next) => {
//   NProgress.start()
//   next()
// })

// router.afterEach((route, redirect, next) => {
//   NProgress.done()
// })

export default router
