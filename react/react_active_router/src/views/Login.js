import React,{ useState,useEffect,useContext } from 'react';
import { getUpdateUserInfoAction,getUpdateRoutesAction } from '../store/actionCreator';
import { glbContext } from '../store';
import { handleLogin,getMenu } from '../api/views/Login';
let showName=false



function Login(props){
    const [ state,dispatch ] = useContext(glbContext);
    const [ account,setAccount ] = useState('');
    const [ password,setPassword ] = useState('');
    //已登录跳过Login
    
    //controller
    function login(){
        handleLogin({account,password}).then(
            ({ userName }) => {
                dispatch(getUpdateUserInfoAction({ userName }))
                getMenu().then(
                    (list)=>{                   
                        dispatch( getUpdateRoutesAction({ list }))
                        props.history.push('/nav')
                    }
                )
            }
        )
    }
    useEffect(()=>{
        if(!showName){
            showName=!showName
        }else{
            // alert(state.userName)
        }
    },[state.userName])

    useEffect(()=>{
        if(state.isLogin){
            props.history.replace('/nav')
        }
    },[])
    return (
        <div style={{margin:'100px auto'}}>
            <div>
                账号：<input value={ account } onChange={e => setAccount(e.target.value)}  type="text"/>
            </div>
            <div>
                密码：<input value={ password } onChange={e => setPassword(e.target.value)} type="password"/>
            </div>
            <div>
                <button onClick={ login }>Login</button>
            </div>
        </div>
    )
}
export default Login;