<template>
    <li :style="{width:width+'%'}">
        <slot>ComponentGreen</slot>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                width:0,    
            }
        },
    }
</script>

<style lang="scss" scoped>
    li{
        background:lightgreen;
    }
</style>