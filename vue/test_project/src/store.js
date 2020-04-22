import Vue from 'vue'
import Vuex from 'vuex'
import {TaskNodeStore} from 'vue-task-node';

Vue.use(Vuex)
let moduleA={
  namespaced:true,
  state:{
    baseData:1,
  },
  getters:{
    data(state,getters,rootstate){
      console.log(rootstate)
      return state.baseData+1;
    }
  }
}
let moduleB={
  namespaced:true,
  state:{
    baseData:2,
  },
  mutations:{
    increment(state,val){
      state.baseData+=val;
    }
  }
}


export default new Vuex.Store({
  modules:{
    a:moduleA,
    b:moduleB,
    TaskNodeStore
  },
  state:{
    c:10,
  }
  // state: {
  //   a:1,
  //   b:2,
  //   baseData:2,
  // },
  // getters:{
  //   varLength(state,getters){
  //     return Object.keys(state).length+Object.keys(getters).length;
  //   },
  // },
  // mutations: {
  //   pow(state,{powVal=1}={}){
  //     state.baseData**=powVal;
  //   },
  //   sqrt(state){
  //     state.baseData=Math.sqrt(state.baseData);
  //   },
  // },
  // actions: {
  //   sqrtAsync(context){
  //     setTimeout(()=>{
  //       context.commit('sqrt');
  //     },2000)
  //   },
  // }
})
