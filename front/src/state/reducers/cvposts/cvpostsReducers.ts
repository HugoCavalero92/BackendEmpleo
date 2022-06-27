import { CVActionType } from "../../action-types/cvposts/cvposts-action-types";
import { CVAction } from "../../actions/cvposts/cvposts-actions";

interface CVState {
    loading: boolean;
    error: string | null;
    cv?: any;
};

const initialState = {
    loading: false,
    error: null,
    cv: []
}

export const CVReducer = (state: CVState = initialState, action: CVAction): CVState => {
    switch (action.type) {
        case CVActionType.CV_POST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CVActionType.CV_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                cv: [...state?.cv, action?.payload],
            };
        case CVActionType.CV_POST_FAIL:
            return {
                ...state,
                error: action.payload
            };
        case CVActionType.CV_GET_REQUEST:
            return {
                ...state,
                loading: true
            };
            case CVActionType.CV_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                cv: action?.payload
            };
            case CVActionType.CV_GET_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}