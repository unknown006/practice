import Vue from 'vue'
import App from './App.vue';
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import {TaskNode} from 'vue-task-node';
import 'vue-task-node/dist/css/vnode.css'
Vue.use(ElementUI);
Vue.use(TaskNode);

router.beforeEach((to,from,next)=>{
  Nprogress.start();
  setTimeout(()=>{
    next();
  },1000)
})
router.afterEach((to,from,next)=>{
  Nprogress.done();
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
