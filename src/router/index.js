import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import app from '@/components/app'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HLogin',
      component: login
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    },
    {
      path: '/app',
      name: 'App',
      component: app
    }
  ]
})