import axios from 'axios';
import { Dispatch } from 'redux';
import { UserActionType } from '../../action-types/user/user-action-types';
import { Action } from '../../actions/user';
import { errorAlert } from '../../../helpers/generic-message-alerts';


export const login = (email: string, password: string) => {
   return async(dispatch: Dispatch<Action>) => {
        dispatch({
            type: UserActionType.USER_LOGIN_REQUEST
        });
        try{
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const {data} = await axios.post(
                'http://localhost:3300/api/login', 
                {email, password}, 
                config
                );
            dispatch({
                type: UserActionType.USER_LOGIN_SUCCESS,
                payload: data
            });

            localStorage.setItem('userInfo', JSON.stringify(data));

        }catch(error: any){
            
            errorAlert(error.response.data.msg || 'Ah ocurrido un problema');
            dispatch({
                type: UserActionType.USER_LOGIN_FAIL,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            })
        }
    }
}

export const logout = () => (dispatch: Dispatch<Action>) => {
    localStorage.removeItem('userInfo');
    dispatch({type: UserActionType.USER_LOGOUT});
    dispatch({type: UserActionType.USER_DETAILS_RESET});
}

export const register = (name: string, surname: string, email: string, password: string) => {
    return async(dispatch: Dispatch<Action>) => {
        try{
            dispatch({
                type: UserActionType.USER_REGISTER_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const {data} = await axios.post(
                'http://localhost:3300/api/usuarios', 
                {name, surname, email, password}, 
                config);
            dispatch({
                type: UserActionType.USER_REGISTER_SUCCESS,
                payload: data
            });
            dispatch({
                type: UserActionType.USER_LOGIN_SUCCESS,
                payload: data,
            })

            localStorage.setItem('userInfo', JSON.stringify(data));

        }catch(error: any){
            dispatch({
                type: UserActionType.USER_REGISTER_FAIL,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            });
            errorAlert(error.response.data.msg || 'Ah ocurrido un problema');
        }
    }
}
