<template>
    <div>
        <div class="bg">{{str}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                str:'',
            }
        },
        props: {
            string: {
                type: String, 
            },
        },
        watch:{
            // string(newVal,oldVal){
            //     this.str=newVal;
            // }
        },
        created(){
            this.str=this.string;
        },
        mounted(){
            setInterval(()=>{
                let frag=this.str.slice(0,1);
                let frag2=this.str.slice(1);
                this.str=frag2+frag;
            },500)
        },
        beforeRouteEnter(to,from,next){
            next((vm)=>{
                vm.str=vm.string;
            });
        },
        beforeRouteLeave(to,from,next){
            let that=this;
            next()
        },
        
    }
</script>

<style lang="scss" scoped>
    .bg{
        height:50vh;
        line-height:50vh;
        background:black;
        font-size:38px;
        color:white;
    }
</style>