import {
    USER_LOGIN,
    UPDATE_ROUTES,
} from './action_types'
export default (state,action)=>{
    let newState=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case USER_LOGIN:
            newState.userName=action.userName;
            newState.loginTime=new Date().toLocaleDateString();
            newState.isLogin=true;
            return newState;
        case UPDATE_ROUTES:
            newState.routes=[...action.list,...newState.routes]
            newState.menu=action.list.find((elem)=>{
                return elem.menu;
            }).children
            console.log(newState)
            return newState
        default :
            return state;
    }
}