const state={
    userName:null,
}
const mutations={
    updateInfo(state,typeName){
        state.userName=typeName;
    },
}
const actions={
    //
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
}