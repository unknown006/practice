<template>
    <div class="container">
        {{contentC}}
    </div>
</template>

<script>
    export default {
        props:{
            contentC:{
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
        background:lightsteelblue;
    }
</style>