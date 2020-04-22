<template>
    <div class="container">
        {{contentR}}
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        props:{
            contentR:{
                type:[String,Number],
                default:'no message',
            },
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        height:80vh;
        width:30%;
        background:lightgreen;
    }
</style>