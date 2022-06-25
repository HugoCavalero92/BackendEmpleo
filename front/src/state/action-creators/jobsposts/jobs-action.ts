import axios from 'axios';
import { Dispatch } from 'redux';
import { errorAlert, successAlert } from '../../../helpers/generic-message-alerts';
import { JobActionType } from '../../action-types/jobsposts/jobs-action-types';
import { JobAction } from '../../actions/jobsposts/jobs-actions';

export const createJobPost = (title: string, description: string, userInfo: any) => {
    return async(dispatch: Dispatch<JobAction>) => {
        try{
            dispatch({
                type: JobActionType.JOB_POST_REQUEST
            });
            const token = userInfo.token;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token || ''
                }
            };

            const {data} = await axios.post(
                'http://localhost:3300/api/ofertas', 
                {title, description}, 
                config);
            dispatch({
                type: JobActionType.JOB_POST_SUCCESS,
                payload: data
            });
            successAlert(data.msg);

        }catch(error: any){
            dispatch({
                type: JobActionType.JOB_POST_FAIL,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            });
            errorAlert(error.response.data.msg || 'Ah ocurrido un problema');
        }
    }
}

export const getAllJobPost = () => {
    return async(dispatch: Dispatch<JobAction>) => {
        try{
            dispatch({
                type: JobActionType.JOB_GET_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            const {data} = await axios.get(
                'http://localhost:3300/api/ofertas', 
                config);
            dispatch({
                type: JobActionType.JOB_GET_SUCCESS,
                payload: data
            });

        }catch(error: any){
            dispatch({
                type: JobActionType.JOB_GET_FAIL,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            });
            errorAlert(error.response.data.msg || 'Ah ocurrido un problema');
        }
    }
}