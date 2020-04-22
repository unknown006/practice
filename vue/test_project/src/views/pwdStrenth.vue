<template>
    <div>
        <input type="text" v-model="value">
        <div class="verificationStyle">
            <div class="strength-steps">
                <div class="box" :class="leftClass"></div>
                <div class="box" :class="middleClass"></div>
                <div class="box" :class="rightClass"></div>
            </div>
            <span>密码强度:{{value|strengthLevel}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value:'',
                enabledClass:{
                    change:true,
                },
            }
        },
        computed:{
            leftClass(){
                return this.value>=1 ? this.enabledClass : ''
            },
            middleClass(){
                return this.value>=2 ? this.enabledClass : ''
            },
            rightClass(){
                return this.value>=3 ? this.enabledClass : ''
            }
        },
        watch:{
            //判断修改匹配数量的逻辑(正则验证等)
        },
        filters:{
            strengthLevel(value){
                let res=''
                switch(Number(value)){
                    case 3:
                        res='强'
                    break;
                    case 2:
                        res='中'
                    break;
                    case 1:
                        res='弱'
                    break;
                    default:
                        res=''
                    break;
                }
                return res;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .change{
        background:red;
    }
    .strength-steps{
        width:100px;
        margin:0 auto;
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .box{
        width:20px;
        height:10px;
        border:1px solid black;
    }
    .left{

    }
    .middle{

    }
    .right{

    }
</style>