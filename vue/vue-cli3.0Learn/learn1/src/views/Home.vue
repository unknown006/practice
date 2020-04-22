<template>
  <div class="home">
    <router-link to="/login">登录</router-link>
    <Render :grid-color="{odd:'purple',even:'gold'}" @mousemove="move"></Render>
    <div class="buttons">
      <router-link :to="{path:'/routerBase',query:{go:-2}}">跳转路由学习相关页面</router-link>
      <router-link :to="{ name:'bus' }">跳转Bus状态管理相关页面</router-link>
      <router-link :to="{ name:'proxy' }">跳转代理(proxy)相关页面</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Render from '@/components/Render.vue'

export default {
  name: 'home',
  mounted(){
    
  },
  methods:{
    move(){
      console.log(1)
    },
  },
  components: {
    HelloWorld,
    Render
  },
  
}
</script>
<style lang="scss">
  .buttons{
    display:flex;
    flex-flow:column nowrap;
    align-items: center;
  }
</style>
