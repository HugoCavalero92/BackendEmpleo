import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./user/userReducers";
import { JobsReducer } from './jobsposts/jobsReducers';


const reducers = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    jobs: JobsReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;