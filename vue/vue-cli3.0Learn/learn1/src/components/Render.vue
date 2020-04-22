<script>
export default {
    render(createElement){
        let notFirst=(index,val)=>{
            if(index>0){
                return val;
            }
        }
        let grid=(index,val)=>{
            if( typeof val == 'object'){
                if((index+1)%2!=0){
                    return val.odd;
                }else{
                    return val.even;
                }
            }else if(typeof val == 'string'){
                if((index+1)%2!=0){
                    return val;
                }else{
                    return '';
                }
            }
        }
        return createElement('h1',{
            'class':{container:true},
            style:{},
            attrs:{id:'container'},
            props:{},
            domProps:{},
            on:{},
            nativeOn:{},
        },Array.from({length:10}).map((elem,index)=>{
            return createElement('p',{
                style:{
                    borderTop:notFirst(index,'1px solid white'),
                    background:grid(index,this.gridColor),
                },
                on:{
                    click(){
                        alert(index+1)
                    },
                }
            },"p元素"+(index+1));
        }))
    },
    data(){
        return {

        }
    },

    props:{
        gridColor:{
            default(){
               return  {odd:'#666',even:'#000',}
            },
        },
    },
    methods:{

    },
}
</script>
<style lang="scss" scoped>
    .container{
        background:black;
    }
    #container{
        color:white;
    }
    p{
        margin: 0;
        padding:0;
    }
    p:hover{
        cursor:pointer;
    }
</style>