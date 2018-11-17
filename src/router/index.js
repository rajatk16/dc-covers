import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Comics from '../components/Comics'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import NotFound from '../components/NotFound'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/comics',
      name: 'Comics',
      component: Comics,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('comics')
  else next()
})

export default router
