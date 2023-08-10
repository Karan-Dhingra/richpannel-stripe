import { GET_PLANS_FAILED, GET_PLANS_REQUEST, GET_PLANS_SUCCESS, OPEN_TOAST, OPEN_TOAST_RESET, SUBSCRIBE_FAILED, SUBSCRIBE_REQUEST, SUBSCRIBE_SUCCESS, SUBSCRIBTION_PLAN, UNSUBSCRIBE_FAILED, UNSUBSCRIBE_REQUEST, UNSUBSCRIBE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_RESETTING_LOGIN } from "../constants/userConstant"

const localUserInfo = JSON.parse(localStorage?.getItem('user'))

const userState = {
    loading: false,
    isLogin: localUserInfo ? true : false,
    userInfo: localUserInfo ? localUserInfo.user : null,
    accessToken: localUserInfo?.accessToken || null,
    verificationHash:
        JSON.parse(localStorage?.getItem('verificationHash')) || null,
    expiresAt: localUserInfo?.expireAt || null,
    error: null,
    dontAllowRefresh: false
}

export const userLoginReducer = (state = userState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
                isLogin: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                walletNotFound: false,
                expiresAt: null,
                error: null,
                verificationHash: null,
                dontAllowRefresh: false
            }
        case USER_RESETTING_LOGIN:
            return {
                loading: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                walletNotFound: false,
                error: null,
                expiresAt: null,
                verificationHash: null,
                dontAllowRefresh: false
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                isLogin: action.payload ? true : false,
                userInfo: action.payload ? action.payload.user : action.payload,
                accessToken: action.payload.accessToken,
                verificationHash: action.verificationHash,
                walletNotFound: false,
                expiresAt: action.payload.expireAt,
                error: null,
                dontAllowRefresh: action.dontAllowRefresh,
            }
        case USER_LOGIN_FAIL:
            return {
                loading: false,
                isLogin: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                walletNotFound: true,
                expiresAt: null,
                error: action.payload,
                verificationHash: null,
                dontAllowRefresh: false
            }
        case USER_LOGOUT:
            return {
                loading: false,
                isLogin: false,
                userInfo: null,
                isAdmin: false,
                accessToken: null,
                walletNotFound: false,
                error: null,
                expiresAt: null,
                verificationHash: null,
                dontAllowRefresh: false
            }

        default:
            return state
    }
}

const registeState = {
    loading: false,
    data: {},
    error: null,
}

export const userRegisterReducer = (state = registeState, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:{
            return{
                loading: true,
                data: {},
                error: null,
            }
        }
        case USER_REGISTER_SUCCESS:{
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        }
        case USER_REGISTER_FAIL:{
            return{
                loading: false,
                data: {},
                error: action.payload,
            }
        }
        default:{
            return state
        }
    }
}

const subsribtionState = {
    loading: false,
    data: {},
    error: null,
}

export const subscribeReducer = (state = subsribtionState, action) => {
    switch (action.type) {
        case SUBSCRIBE_REQUEST:
            return {
                loading: true,
                data: {},
                error: null,
            }
        case SUBSCRIBE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        case SUBSCRIBE_FAILED:
            return {
                loading: false,
                data: {},
                error: action.payload,
            }

        default:
            return state
    }
}

const unsubsribtionState = {
    loading: false,
    data: {},
    error: null,
}

export const unsubscribeReducer = (state = unsubsribtionState, action) => {
    switch (action.type) {
        case UNSUBSCRIBE_REQUEST:
            return {
                loading: true,
                data: {},
                error: null,
            }
        case UNSUBSCRIBE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            }
        case UNSUBSCRIBE_FAILED:
            return {
                loading: false,
                data: {},
                error: action.payload,
            }

        default:
            return state
    }
}

const getPlansState = {
    loading: true,
    plans: [],
    error: null,
}

export const getPlansReducer = (state = getPlansState, action) => {
    switch (action.type) {
        case GET_PLANS_REQUEST:
            return {
                loading: true,
                plans: [],
                error: null,
            }
        case GET_PLANS_SUCCESS:
            return {
                loading: false,
                plans: action.payload,
                error: null,
            }
        case GET_PLANS_FAILED:
            return {
                loading: false,
                plans: [],
                error: action.payload,
            }

        default:
            return state
    }
}

const subsribtionPlanState = {
    currentPlan: null
}

export const subscribePlansReducer = (state = subsribtionPlanState, action) => {
    switch (action.type) {
        case SUBSCRIBTION_PLAN:
            return {
                currentPlan: action.payload,
            }

        default:
            return state
    }
}

const ToastState = {
    open: false,
    msg: 'msg',
    heading: 'msg',
    error: false,
}

export const toastHandleReducer = (state = ToastState, action) => {
    switch (action.type) {
        case OPEN_TOAST:
            return { open: action.open, msg: action.msg, heading: action.heading, error: action.error }

        case OPEN_TOAST_RESET:
            return { open: false, msg: '', heading: '', error: false }

        default:
            return state
    }
}
