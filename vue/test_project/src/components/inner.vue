<template>
    <li :style="{width:width+'%'}">
        <slot>default</slot>
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

</style>