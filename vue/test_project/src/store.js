import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    a:1,
    b:2,
    baseData:2,
  },
  getters:{
    varLength(state,getters){
      return Object.keys(state).length+Object.keys(getters).length;
    },
  },
  mutations: {
    pow(state,{powVal=1}={}){
      state.baseData**=powVal;
    },
    sqrt(state){
      state.baseData=Math.sqrt(state.baseData);
    },
  },
  actions: {
    sqrtAsync(context){
      setTimeout(()=>{
        context.commit('sqrt');
      },2000)
    },
  }
})
