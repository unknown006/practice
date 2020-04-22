import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['./views/test.vue'],resolve),
    },
    {
      path:'/drag',
      name:'drag',
      component:resolve => require(['./views/drag.vue'],resolve)
    },
    {
      path:'/test',
      name:'test',
      component:()=>import('@/views/test2Container.vue')
    }
  ]
})
