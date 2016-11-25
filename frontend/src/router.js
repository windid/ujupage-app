import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import store from './store'

Vue.use(VueRouter)

// 异步加载的模块
const Editor = resolve => require(['./components/editor/Editor.vue'], resolve)
const Preview = resolve => require(['./components/preview/Preview.vue'], resolve)
const Dashboard = resolve => require(['./components/dashboard/Dashboard.vue'], resolve)
const Account = resolve => require(['./components/account/Account.vue'], resolve)
const Stats = resolve => require(['./components/stats/Stats.vue'], resolve)
const Leads = resolve => require(['./components/leads/Leads.vue'], resolve)
const Register = resolve => require(['./components/auth/Register.vue'], resolve)
const Active = resolve => require(['./components/auth/Active.vue'], resolve)
const ForgetPassword = resolve => require(['./components/auth/ForgetPassword.vue'], resolve)
const ResetPassword = resolve => require(['./components/auth/ResetPassword.vue'], resolve)

// 同步加载的模块
import Home from './components/common/Home'
import Login from './components/auth/Login'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
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
    { path: '/active', name: 'active', component: Active },
    { path: '/forgetpassword', name: 'forgetpassword', component: ForgetPassword },
    { path: '/resetpassword/:token', name: 'resetpassword', component: ResetPassword },
    { path: '/editor/:pageId', name: 'editor', component: Editor, meta: { requiresAuth: true, preFetch: 'editorInit' }},
    { path: '/editor/:pageId/:variationId', name: 'variation', component: Editor, meta: { requiresAuth: true, preFetch: 'editorInit' }},
    { path: '/preview/:pageId/:variationId', name: 'preview', component: Preview, meta: { requiresAuth: true }},
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: true },
      children: [
        { path: '', name: 'dashboard', component: Dashboard, meta: { preFetch: 'dashboardInit' }},
        { path: '/account', name: 'account', component: Account },
        { path: '/leads/:pageId', name: 'leads', component: Leads },
        { path: '/stats/:pageId/:module', name: 'stats', component: Stats, meta: { preFetch: 'statsInit' }}
      ]
    }
  ]
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLogin) {
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
