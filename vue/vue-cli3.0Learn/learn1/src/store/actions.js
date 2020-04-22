export default {
    async handleLogin(context,str){
       return await new Promise(resolve => {
            console.log(context)
            setTimeout(()=>{
                if(str=='admin'){
                    context.commit('user/updateInfo','超级管理员',{root:true})
                    resolve('超级管理员已登录')
                }else{
                    context.commit('user/updateInfo','普通用户',{root:true})
                    resolve(`普通用户${str}已登录`)
                }
                context.state.login=true;
            },2000)
        })
    }
}