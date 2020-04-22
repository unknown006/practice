<template>
    <div>
        Ashow:{{message}}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message:''
            }
        },
        mounted(){
            this.$bus.$on('on-input',(msg)=>{
                this.message=msg;
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>