<template>
    <div>
        <el-autocomplete
            class="inline-input"
            v-model="value"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            :trigger-on-focus="false"
            @select="selectHandle"
    ></el-autocomplete>
    </div>
</template>

<script>
    import { mapState,mapGetters,mapMutations,mapActions } from 'vuex';
    export default {
        data() {
            return {
                printCount:1,
                localA:10,
                value:'',
            }
        },
        mounted(){
         //console.log(this.a,this.aString,this.afun,this.b,this.$store.state.a);
         //console.log(this.a,this.b)

         //对象扩展运算符测试
         //let obj={a:1,b:2,c:3}
         //console.log({...obj});
        //  console.log(this.localA,this.localA2,this.a,this.a2,this.a3)
        //  console.log(this.varLength)
        //  console.log(this.baseData)
         this.$store.commit('pow',{powVal:4});
        //  console.log(this.baseData)
         this.pow({powVal:2});
         this.sqrtAsync();
        },
        watch:{
            baseData(newVal,oldVal){
                console.log(newVal,oldVal)
                console.log(this.baseData,`${this.printCount++}`);
            }
        },
        methods: {
            querySearch(val,callback){
                let that=this;
                let arr=[];
                for(let i=0;i<val.length;i++){
                    arr.push({value:'谢伟',gender:'male'})
                }
                callback(arr);
            },
            selectHandle(item){
                console.log(item)
            },
            ...mapMutations([
                'pow',
            ]),
            ...mapActions([
                'sqrtAsync',
            ])
        },
        computed:{
            localA2(){
                return this.localA+10;
            },
            ...mapGetters([
                'varLength',
            ]),
            ...mapState({
                a:state =>state.a,
                a2:'a',
                a3(state){
                    return this.localA+state.a;
                },
                baseData:'baseData',
            }),
        }
        /*computed:mapState({
            a:state=>state.a,
            aString:'a',
            afun(state){
                return state.a+this.localA;
            },
            b(){
                return this.localA+2;
            },
        }),*/


        //computed:mapState(['a','b'])
    }
</script>

<style lang="scss" scoped>

</style>