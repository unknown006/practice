<template>
    <div class="container">
        <a-input @input="handleInput" v-model="value"></a-input>
        <!-- <p>{{value}}</p> -->
        <a-show :content="value"/>
    </div>
</template>

<script>
    import aInput from '@/components/bus/A_input.vue'
    import aShow from '@/components/bus/A_show.vue'
    export default {
        data() {
            return {
                value:'',
            }
        },
        methods: {
            handleInput(value) {
                console.log(value)
            }
        },
        components:{
            aInput,
            aShow
        }
    }
</script>

<style lang="scss" scoped>

</style>