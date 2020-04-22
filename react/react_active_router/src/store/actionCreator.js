import { 
    USER_LOGIN,
    UPDATE_ROUTES,
} from '../store/action_types';

export const getUpdateUserInfoAction = params => ({ type:USER_LOGIN,...params })

export const getUpdateRoutesAction = params => ({ type:UPDATE_ROUTES,...params })


