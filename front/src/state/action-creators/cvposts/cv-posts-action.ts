import axios from 'axios';
import { Dispatch } from 'redux';
import { errorAlert, successAlert } from '../../../helpers/generic-message-alerts';
import { JobActionType } from '../../action-types/jobsposts/jobs-action-types';
import { CVAction } from '../../actions/cvposts/cvposts-actions';
import { JobAction } from '../../actions/jobsposts/jobs-actions';
import { CVActionType } from '../../action-types/cvposts/cvposts-action-types';

export const createCVPost = (experience: string, education: string, language: string, personalInformation: string, userInfo: any) => {
    return async(dispatch: Dispatch<CVAction>) => {
        try{
            dispatch({
                type: CVActionType.CV_POST_REQUEST
            });
            const token = userInfo.token;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token || ''
                }
            };

            const {data} = await axios.post(
                'http://localhost:3300/api/hojadevida', 
                {experience, education, language, personalInformation}, 
                config);
            dispatch({
                type: CVActionType.CV_POST_SUCCESS,
                payload: data
            });
            console.log(data);
            successAlert(data.msg);

        }catch(error: any){
            dispatch({
                type: CVActionType.CV_POST_FAIL,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            });
            errorAlert(error?.response?.data?.msg || 'Ah ocurrido un problema');
        }
    }
}

export const getAllCV = () => {
    return async(dispatch: Dispatch<CVAction>) => {
        try{
            dispatch({
                type: CVActionType.CV_GET_REQUEST
            });

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };

            const {data} = await axios.get(
                'http://localhost:3300/api/hojadevida', 
                config);
            dispatch({
                type: CVActionType.CV_GET_SUCCESS,
                payload: data
            });
            console.log(data);
        }catch(error: any){
            dispatch({
                type: CVActionType.CV_GET_FAIL,
                payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message
            });
            errorAlert(error?.response?.data?.msg || 'Ah ocurrido un problema');
        }
    }
}