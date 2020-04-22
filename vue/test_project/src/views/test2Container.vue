<template>
    <div class="container">
        <div class="scroll">
            <div class="header"></div>
            <div class="main">
                <Test2></Test2>
            </div>
            <div class="footer"></div>
        </div>
    </div>
</template>

<script>
    import Test2 from '@/views/test2' 
    export default {
        data() {
            return {
                
            }
        },
        components:{
            Test2,
        },
    }
</script>

<style lang="less" scoped>
.container{
    *{
        margin: 0;
        padding:0;
    }
    height:100vh;
    .scroll{
        min-height:100%;
        display:flex;
        flex-flow:column nowrap;
        align-items: center;
        .header{
            width:100%;
            height:50px;
            background:red;
        }
        .main{
            display:flex;
            flex-flow: column nowrap;
            align-items: center;
            flex-grow:1;
            min-height:calc(100% - 100px);
            background:#000;
            width:100%;
        }
        .footer{
            width:100%;
            height:50px;
            background:blue;
        }
    }
    
}
    
</style>