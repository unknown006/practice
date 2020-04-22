import axios from '../index';

export const handleLogin = (params) => axios.get('http://localhost:4000/user/login',{ params }).then(({data:{ data }})=> data )

export const getMenu = (params) => axios.get('http://localhost:4000/menu/getMenu',{ params }).then(({data:{ data }})=> data )