import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

import store from '@/store'
import logger from './logger'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout'
    },
    {
      path: '/confirm-registration/:userId',
      name: 'confirmRegistration',
      component: () => import(/* webpackChunkName: "confirm-registration" */ './views/ConfirmRegistration.vue')
    },
    {
      path: '/',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "faq" */ './views/Faq.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/SignUp.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  logger.debug('ROUTER: to', to, ', from', from)
  const isLoggedIn = store.getters['auth/isLoggedIn']

  if (to.name === 'login') {
    if (isLoggedIn) next('/')
    next()
  } else if (!isLoggedIn && to.name !== 'signup' && to.name !== 'confirmRegistration') {
    next('/login')
  } else if (to.name === 'logout' || to.name === '/logout') {
    await store.dispatch('auth/logout')
    next('/login')
  } else {
    next()
  }
})

export default router
