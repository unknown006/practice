import Home from '@/views/Home.vue';
export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/Login.vue'),
  },
  {
    path:'/routerBase',
    name:'routerBase',
    alias:'baseRouter',
    component:()=>import('@/views/router/base.vue'),
    children:[
      {
        path:'components',
        name:'components',
        components:{
          default:()=>import('@/components/router/center.vue'),
          left:()=>import('@/components/router/left.vue'),
          right:()=>import('@/components/router/right.vue'),
        },
        meta:{
          title:'多视图路由'
        }
      },
      //对象模式
      {
        path:'props',
        component:()=>import('@/components/router/props.vue'),
        props:{
          string:'路由props传值',
        },
        meta:{
          title:'路由传值1'
        }
      },
      //bool模式
      {
        path:'props2',
        name:'props2',
        component:()=>import('@/components/router/props.vue'),
        props:true,
        meta:{
          title:'路由传值2'
        }
      },
      //函数模式
      {
        path:'props3',
        name:'props3',
        component:()=>import('@/components/router/props.vue'),
        props:route => ({
          string:route.query.str,
        }),
        meta:{
          title:'路由传值3'
        }
      },
    ],
    beforeEnter(to,from,next){
      if(from.name=='login') alert('这是从登录页来的')
      else alert('这不是从登录页来的')
      next();
    },
  },
  //路由切换动画
  {
    path:'/routerTransition',
    name:'routerTransition',
    component:()=>import('@/views/router/transition.vue'),
    meta:{
      title:'路由切换过渡'
    },
    children:[
      {
        path:'page1',
        name:'transPage1',
        component:()=> import('@/views/router/transPage1.vue'),
        meta:{
          num:1,
        }
      },
      {
        path:'page2',
        name:'transPage2',
        component:()=> import('@/views/router/transPage2.vue'),
        meta:{
          num:2,
        }
      },
      {
        path:'page3',
        name:'transPage3',
        component:()=> import('@/views/router/transPage3.vue'),
        meta:{
          num:3,
        }
      },
    ],
  },
  {
    path:'/bus',
    name:'bus',
    component:()=>import('@/views/bus/bus.vue'),
  },
  {
    path:'/proxy',
    name:'proxy',
    component:()=> import('@/views/proxy/proxy.vue')
  },
  {
    path:'*',
    redirect(to){
      return {
        name:'home',
      }
    },
  },
]
