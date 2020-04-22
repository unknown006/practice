<template>
  <div id="app">
    <outer ref="list">
      <middle slot-scope="{row}" :row="row" :title="rowTitle"> 
        <!-- 动态引用要与引入的组件变量一致 -->
        <div :is="comp"></div>
        <div :is="comp"></div>
        <div :is="comp"></div>
      </middle>
    </outer>
    <div class="count-down">
      {{countDown[0]}}天{{countDown[1]}}小时{{countDown[2]}}分{{countDown[3]}}秒
    </div>
    <el-button type="primary" style="margin-top:10px" @click="$router.push('/drag')">To DragPage</el-button>
    <hr>
    <iframe src="https://kgw.baojunev.com/metaBase/public/dashboard/e5be9472-3a0a-4783-ab2a-11b36fef7184" style="width:100%;height:1000px;" frameborder="0"></iframe>
  </div>
</template>

<script>
// @ is an alias to /src
import outer from '@/components/outer.vue';
import middle from '@/components/middle.vue';
import inner from '@/components/inner.vue';
import innerRed from '@/components/innerRed.vue'
import innerGreen from '@/components/innerGreen.vue'
import innerBlue from '@/components/innerBlue.vue'
import {mask,moment,addInterval,timeDuration} from 'mulan-lib';
export default {
    data(){
      return {  
          list:[
            {a:'aaa',b:'bbdfgb',c:'ccgc',d:'ddd',e:'eee'},
            {a:'fff',b:'ggg',c:'ccc',d:'dddfgd',e:'eee'},
            {a:'aaa',b:'b4b',c:'ccc',d:'ddd',e:'eee'},
            {a:'afgaa',b:'bbb',c:'ccdfc',d:'dddfgd',e:'eedfe'},
          ],
          rowTitle:{
            a:'A',
            b:'B',
            c:'C',
          },
          comp:innerRed,
          startTime:new Date(),
          endTime:new Date('2019-07-04 15:19:00'),
      }
    },
    mounted(){     
      this.$refs['list'].complete(this.list);
      let arr=[innerRed,innerGreen,innerBlue];
      let i=0;
      setInterval(()=>{
        if(i==arr.length){
          i=0;
        }
        this.comp=arr[i];
        i++;
      },500)
      this.getCurrentTime();
     let timer=setInterval(()=>{
        let over=this.countDown.every((elem)=>{
          return elem==0;
        })
        if(over){
          clearInterval(timer)
        }else{
          this.getNow();
        }
      },1000)
      console.log(mask(0,-4,this.formatNow(),'卐'))
    },
    methods:{
      getCurrentTime(){
        // let st=moment('YYYY-MM-DD HH:mm:ss')(date);
        // let et=moment('YYYY-MM-DD HH:mm:ss')(addInterval(1,'d',date));
        // let duration=timeDuration(moment('x')(st),moment('x')(et));
      },
      getNow(){
        this.startTime=new Date();
      },
      formatNow(){
        return moment('YYYY+MM+DD HH-mm-ss')(this.startTime);
      }
    },
    computed:{
      countDown(){
        let st=this.startTime;
        let et=this.endTime;
        let arr=timeDuration(moment('x')(st),moment('x')(et));
        return arr;
      },
    },
    components: {
      outer,
      middle,
      inner,
      innerRed,
      innerGreen,
      innerBlue,
    }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.count-down{
  margin-top:20px;
}
</style>
<style lang="scss">
  ul,p{
    list-style:none;
    margin:0;
    padding:0;
    li{
      margin:0;
      padding:0;
    }
  }
</style>
