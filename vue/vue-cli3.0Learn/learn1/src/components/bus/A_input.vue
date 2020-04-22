<template>
    <div>
        <input type="text" @input="handleInput($event)" :value="value">
    </div>
</template>

<script>
    export default {
        name:'A_input',
        data() {
            return {
                
            }
        },
        props:{
            value:{
                type:[String,Number],
                default:'',
            }
        },
        methods: {
            handleInput(event) {
                let value=event.target.value;
                this.$bus.$emit('on-input',value)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>