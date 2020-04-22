<template>
    <li>
        <p class="title">
            <span v-for="(item,index) in title" :key="index">{{item+':'+row[index]}}</span>
        </p>
        <ul ref='list' class="list">
            <slot/>
        </ul>
    </li>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props:{
            title:{
                type:Object,
                default(){
                    return {};
                },
            },
            row:{
                type:Object,
                defaule(){
                    return {};
                },
            },
        
        },
        mounted(){
            this.$nextTick(()=>{
                this.calcChildWidth();
            })
        },
        methods:{
            calcChildWidth(){
                console.log(this.$refs['list'])
                // let childCount=this.$refs['list'].$children.length;
                // let width=100/childCount;
                // this.$refs['list'].$children.forEach((elem)=>{
                //     elem.width=width;
                // })
            },
        },

    }
</script>

<style lang="scss" scoped>
    .title{
        height:30px;
        background:pink;
        display:flex;
        flex-flow: row wrap;
        align-items: center;
        width:100%;
        span{
            line-height:30px;
            height:100%;
            margin-left:10px;
        }
    }
    ul.list{
        display:table;
        min-height:60px;
        width:100%;
        li{
            height:100%;
            display:table-cell;
            text-align:center;
            vertical-align:middle;
            margin:0;
            padding:0;
        }
    }
</style>    