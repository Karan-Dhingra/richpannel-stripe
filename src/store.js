import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import thunk from "redux-thunk"
import { getPlansReducer, subscribePlansReducer, subscribeReducer, toastHandleReducer, unsubscribeReducer, userLoginReducer, userRegisterReducer } from "./redux/reducers/userReducer"

const initialState = {}

const reducer = combineReducers({
    userLoginReducer: userLoginReducer,
    userRegisterReducer: userRegisterReducer,
    subscribeReducer: subscribeReducer,
    subscribePlansReducer: subscribePlansReducer,
    toastHandleReducer: toastHandleReducer,
    unsubscribeReducer: unsubscribeReducer,
    getPlansReducer: getPlansReducer
})

export const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    initialState,
    middleware: [thunk]
})