<template>
    <div>

    </div>
</template>

<script>
    import {mapState,mapGetters,mapMutations} from 'vuex';
    export default {
        data() {
            return {
                
            }
        },
        mounted(){
            setTimeout(()=>{
                console.log(this.moduleA,this.moduleB,this.c)
                this.increment(10)
                console.log(this.moduleB.baseData);
                console.log(this.data)
            },1000)
        },
        computed:{
            ...mapState({
                moduleA:'a',
                moduleB:'b',
                c:'c'
            }),
            ...mapGetters({
                data:'a/data',
            })
        },
        methods: {
            ...mapMutations({
                increment:'b/increment',
            })
        },
    }
</script>

<style scoped>

</style>