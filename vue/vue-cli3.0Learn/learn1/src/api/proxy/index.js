import axios from '@/api';

export const rstMagicTest= params => axios.post('/proxy/magic',params);