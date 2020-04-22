import Vue from 'vue'
import Router from 'vue-router'
import routes from './router.js'
import store from '@/store';
import { setTitle } from '@/lib/util';

Vue.use(Router)

let router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log(to)
  to.meta && setTitle(to.meta.title)
  if(to.name=='login' && !store.state.login){
    next()
  }else if(to.name=='login' && store.state.login){
    alert('已登录')
    next(false)
  }else if (!store.state.login) {
    alert('未登录,请登录')
    next({name:'login'})
  } else{
    next()
  }
})

router.beforeResolve((to,from,next)=>{
  next();
})

router.afterEach((to,from)=>{

})

export default router
