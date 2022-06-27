import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducers from "./reducers";

export interface AppState {
    userLogin?: any,
    jobs?: any,
    cvs?: any
  };


const userInfoFromStorage = !!localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')!) : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage, loading: false, error: null},
    jobs: {job: null, loading: false, error: null},
    cvs: {cv: null, loading: false, error: null}
};

export const store = createStore(
    reducers, initialState, applyMiddleware(thunk)
);