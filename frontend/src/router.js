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

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/editor/:pageId', name: 'editor', component: Editor, meta: { requireAuth: true, preFetch: 'editorInit' }},
    { path: '/login', name: 'login', component: Login,
      beforeEnter (to, from, next) {
        store.getters.isLogin ? next('/') : next()
      }
    },
    { path: '/logout',
      beforeEnter (to, from, next) {
        store.dispatch('logout', () => next('/login'))
      }
    },
    { path: '/register', name: 'register', component: Register },
    { path: '/password', name: 'password', component: Password },
    { path: '/resetpassword', name: 'resetpassword', component: ResetPassword },
    { path: '/', name: 'home', component: Home,
      children: [
        { path: '', name: 'dashboard', component: Dashboard, meta: { requireAuth: true, preFetch: 'dashboardInit' }},
        { path: '/account', name: 'account', component: Account, meta: { requireAuth: true }},
        { path: '/stats/:pageId/:module', name: 'stats', component: Stats, meta: { requireAuth: true, preFetch: 'statsInit' }}
      ]
    }
  ]
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !store.getters.isLogin) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    NProgress.start()
    store.dispatch('loading')
    if (to.meta.preFetch) {
      store.dispatch(to.meta.preFetch, [to, () => {
        next()
      }])
    } else {
      next()
    }
  }
})

router.afterEach((to, from, next) => {
  NProgress.done()
  store.dispatch('loadingDone')
})

export default router
