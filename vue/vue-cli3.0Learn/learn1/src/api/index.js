import axios from 'axios';
import config from './config';
const instance = axios.create(config);

instance.interceptors.request.use(config=>{
    return config;
})

export default instance;