<template>
    <div>
        <h3>路由学习</h3>
        <div v-if="simpleView" class="view">
            <router-view/>
        </div>
        <div v-else class="views">       
            <router-view key="left" name="left"/>           
            <router-view key="center"/>           
            <router-view key="left" name="right"/>
        </div>
        <div class="buttons">
            <router-link to="/routerBase/components">多视图展示组件</router-link>
            <router-link :to="{ path:'/routerBase/props' }">路由props传值</router-link>
            <router-link :to="{ name:'props2',params:{ string:'路由props传值方式2' } }">路由props传值方式2</router-link>
            <router-link :to="{ name:'props3',query:{ str:'路由props传值方式3' } }">路由props传值方式3</router-link>
            <router-link :to="{ path:'/404'}">重定向(函数式写法)</router-link>
        </div>
        <div class="buttons">
            <router-link :to="{ name:'routerTransition' }" >路由切换动画</router-link>
        </div>
        <div class="buttons">
            <button @click="handleBack">back</button>
            <button @click="handleGo($route.query.go)">go</button>
            <button @click="handlePush">push</button>
            <button @click="handleReplace">replace</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                simpleView:true,
            }
        },
        methods:{
            handleBack(){
                this.$router.back();
            },
            handleGo(val=-1){
                this.$router.go(val);
            },
            handlePush(){
                this.$router.push('/404')
            },
            handleReplace(){
                this.$router.replace('/routerBase')
            },
        },
        created(){

        },
        beforeRouteUpdate(to,from,next){
            if(to.name=='components'){
                this.simpleView=false;
            }else{
                this.simpleView=true;
            }
            let list=this.$router.options.routes.find((router)=>{
                return router.name=='routerBase'
            }).children
            let fromIndex=list.findIndex((childRouter)=>{
                return childRouter.name==from.name;
            })
            let toIndex=list.findIndex((childRouter)=>{
                return childRouter.name==to.name;
            })
            if(fromIndex>=0 && toIndex>=0){
                alert(`从第${fromIndex+1}个子组件跳至第${toIndex+1}个子组件`)
            }
            next();
        },
    }
</script>

<style lang="scss" scoped>
    .router-enter{
        opacity:0;
    }
    .router-enter-active{
        transition:opacity 2s linear;
    }
    .router-enter-to{
        opacity:1;
    }
    .router-leave{
        opacity:1;
    }
    .router-leave-active{
        transition:opacity 2s linear;
    }
    .router-leave-to{
        opacity:0;
    }
    .views{
        display:flex;
        justify-content: space-around;
        align-items: stretch;
    }
    .buttons{
        margin-top:20px;
        display:flex;
        flex-flow:row wrap;
        justify-content: space-around;
        align-items: center;
    }
</style>