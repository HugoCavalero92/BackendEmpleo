import { JobActionType } from "../../action-types/jobsposts/jobs-action-types";
import { JobAction } from "../../actions/jobsposts/jobs-actions";


interface JobState {
    loading: boolean;
    error: string | null;
    job?: any;
};

const initialState = {
    loading: false,
    error: null,
    job: []
}

export const JobsReducer = (state: JobState = initialState, action: JobAction): JobState => {
    switch (action.type) {
        case JobActionType.JOB_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case JobActionType.JOB_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                job: [...state?.job, action?.payload],
            };
        case JobActionType.JOB_POST_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case JobActionType.JOB_GET_REQUEST:
            return {
                ...state,
                loading: true
            };
        case JobActionType.JOB_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                job: action?.payload
            };
        case JobActionType.JOB_GET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}