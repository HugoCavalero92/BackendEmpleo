import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./user/userReducers";
import { JobsReducer } from './jobsposts/jobsReducers';
import { CVReducer } from './cvposts/cvpostsReducers';


const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    jobs: JobsReducer,
    cvs: CVReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;