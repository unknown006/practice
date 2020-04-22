<template>
    <div>
        <ul>
            <template v-for="(item,index) in data">
                <slot  :row="item" :index="index">undefined</slot>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data:[],
            }
        },
        props:{
            // data:{
            //     type:Array,
            //     default(){
            //         return [];
            //     },
            // },
        },
        methods:{
            complete(data){
                this.data=data;
            },
        },
    }
</script>

<style lang="scss" scoped>

</style>