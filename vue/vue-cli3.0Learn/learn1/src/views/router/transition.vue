<template>
    <div class="container">
        <div class="router-container">
            <transition :name="routerName">               
                <router-view></router-view>               
            </transition>
        </div>
        <div class="buttons">
            <router-link :to="{ name:'transPage1' }">页面1</router-link>
            <router-link :to="{ name:'transPage2' }">页面2</router-link>
            <router-link :to="{ name:'transPage3' }">页面3</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                routerName:'router',
            }
        },
        watch:{
            $route(to,from){
                if(to.meta.num>from.meta.num){
                    this.routerName='router'
                }else{
                    this.routerName='router2'
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        height:auto;
        background:white;
        overflow:hidden;
    }
    .buttons{
        margin: 0 auto;
        width:50%;
        display:flex;
        flex-flow:row wrap;
        justify-content: space-between;
        align-items: stretch;

    }
    .router-enter{
        transform:translateX(650px);
        opacity:0;
    }
    .router-enter-active{
        transition:all 1s linear;
    }
    .router-enter-to{
        transform:translateX(0px);
        opacity:1;
    }
    .router-leave{
        transform:translateX(0px);
        opacity:1;
    }
    .router-leave-active{
        transition:all 1s linear;
    }
    .router-leave-to{
        transform:translateX(-650px);
        opacity:0;
    }

    .router2-enter{
        transform:translateX(-650px);
        opacity:0;
    }
    .router2-enter-active{
        transition:all 1s linear;
    }
    .router2-enter-to{
        transform:translateX(0px);
        opacity:1;
    }
    .router2-leave{
        transform:translateX(0px);
        opacity:1;
    }
    .router2-leave-active{
        transition:all 1s linear;
    }
    .router2-leave-to{
        transform:translateX(650px);
        opacity:0;
    }
    .router-container{
        width:100%;
        height:500px;
        position:relative;
        *{
            position:absolute;
            top:0;
            left:calc(50% - 300px);
        }
    }
</style>