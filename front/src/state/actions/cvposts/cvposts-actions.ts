import { CVActionType } from '../../action-types/cvposts/cvposts-action-types';


export interface CVPostAction {
    type: CVActionType.CV_POST_REQUEST

};

export interface CVPostSuccessAction {
    type: CVActionType.CV_POST_SUCCESS
    payload: any;
};

export interface CVPostFailAction {
    type: CVActionType.CV_POST_FAIL
    payload: any;
};

export interface CVGetAction {
    type: CVActionType.CV_GET_REQUEST

};

export interface CVGetSuccessAction {
    type: CVActionType.CV_GET_SUCCESS
    payload: any;
};

export interface CVGetFailAction {
    type: CVActionType.CV_GET_FAIL,
    payload: any;
};

export type CVAction = 
CVPostAction |
CVPostSuccessAction |
CVPostFailAction |
CVGetAction |
CVGetSuccessAction |
CVGetFailAction
;