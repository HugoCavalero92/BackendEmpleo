import { JobActionType } from "../../action-types/jobsposts/jobs-action-types";


export interface JobPostAction {
    type: JobActionType.JOB_POST_REQUEST;

};

export interface JobPostSuccessAction {
    type: JobActionType.JOB_POST_SUCCESS;
    payload: any;
};

export interface JobPostFailAction {
    type: JobActionType.JOB_POST_FAIL;
    payload: any;
};

export interface JobGetAction {
    type: JobActionType.JOB_GET_REQUEST;

};

export interface JobGetSuccessAction {
    type: JobActionType.JOB_GET_SUCCESS;
    payload: any;
};

export interface JobGetFailAction {
    type: JobActionType.JOB_GET_FAIL;
    payload: any;
};

export type JobAction = 
JobPostAction |
JobPostSuccessAction |
JobPostFailAction |
JobGetAction |
JobGetSuccessAction |
JobGetFailAction
;