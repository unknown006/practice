<template>
    <div>
        <button @click="handleClick">登录</button>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
    export default {
        data() {
            return {
               
            }
        },
        methods: {
            handleClick() {
                let that=this;
                let str=prompt('输入登录账户');
                if(str){
                    this.$store.dispatch('handleLogin',str).then((msg)=>{
                        alert(msg)
                        this.$router.push({name:'home'})
                    })
                }
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>