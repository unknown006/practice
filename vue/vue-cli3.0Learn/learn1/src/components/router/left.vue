<template>
    <div class="container">
        {{contentL}}
    </div>
</template>

<script>
    export default {
        props:{
            contentL:{
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
        background:lightcoral;
    }
</style>