import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('../views/home/Home.vue')
    },
    {
      path: '/category',
      component: () => import('../views/category/Category.vue')
    },
    {
      path: '/cart',
      component: () => import('../views/cart/Cart.vue')
    },
    {
      path: '/profile',
      component: () => import('../views/profile/Profile.vue')
    },
  ],
  mode: 'history'
})