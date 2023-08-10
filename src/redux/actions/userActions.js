import axios from "axios"
import { BACKEND_URL, ErrorMessage, SECRET_CODE } from "../../constant"
import bcrypt from "bcryptjs/dist/bcrypt"
import { GET_PLANS_FAILED, GET_PLANS_REQUEST, GET_PLANS_SUCCESS, OPEN_TOAST, OPEN_TOAST_RESET, SUBSCRIBE_FAILED, SUBSCRIBE_REQUEST, SUBSCRIBE_SUCCESS, SUBSCRIBTION_PLAN, UNSUBSCRIBE_FAILED, UNSUBSCRIBE_REQUEST, UNSUBSCRIBE_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstant"
import { store } from "../../store"

export const register = (form, navigate) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }

        const { data } = await axios.post(
            `${BACKEND_URL}/auth/register`,
            {
                username: form.username,
                password: form.password,
                email: form.email
            },
            config
        )

        if (data && data.status === 200) {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data,
            })
            dispatch(openToast(true, 'Registered Succesfully', 'Now you can login!', false))
            navigate('/login')
        } else {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload: data.msg,
            })
            dispatch(openToast(true, 'Registeration Failed!', data.msg, true))
        }
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: ErrorMessage(error),
        })
        dispatch(openToast(true, 'Registeration Failed!', ErrorMessage(error), true))
    }
}

export const login = (userForm) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }

        const { data } = await axios.post(
            `${BACKEND_URL}/auth/login`,
            {
                email: userForm.email,
                password: userForm.password
            },
            config
        )

        if (data && data.status === 200) {
            const salt = await bcrypt.genSalt(10)
            const verificationHash = await bcrypt.hashSync(
                `${ SECRET_CODE } ${data.accessToken.substring(0, 15)}`,
                salt
            )
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data,
                dontAllowRefresh: userForm?.checked,
                verificationHash,
            })

            if(userForm?.checked){
                localStorage.setItem('user', JSON.stringify(data))
                localStorage.setItem('verificationHash', JSON.stringify(verificationHash))
            }
            // dispatch(openToast(true, 'Loginned Succesfully', '', false))
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: data.msg
            })
            dispatch(openToast(true, 'Login Failed!', data.msg, true))
        }
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: ErrorMessage(error),
        })
        dispatch(openToast(true, 'Login Failed!', ErrorMessage(error), true))
    }
}

export const updateLocalUserInfo = () => async (dispatch) => {
    const {accessToken : token, dontAllowRefresh} = store.getState().userLoginReducer

    const config = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
        },
    }

    if (token) {
        await axios
            .get(`${BACKEND_URL}/auth/getUser`, config)
            .then(async (res) => {
                const salt = await bcrypt.genSalt(10)
                const verificationHash = await bcrypt.hashSync(
                    `${ SECRET_CODE } ${token.substring(0, 15)}`,
                    salt
                )
                if (res?.data?.status === 200) {
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        payload: res.data,
                        dontAllowRefresh: dontAllowRefresh,
                        verificationHash,
                    })

                    if(dontAllowRefresh){
                        localStorage.setItem('user', JSON.stringify(res?.data))
                        localStorage.setItem(
                            'verificationHash',
                            JSON.stringify(verificationHash)
                            )
                    }
                } else {
                    localStorage.clear()
                    dispatch({
                        type: USER_LOGIN_FAIL,
                        payload: 'Something Failed...',
                    })
                }
            })
            .catch((error) => {
                if (error.response.data.msg === 'Invalid Token') {
                    localStorage.clear()
                    window.location.reload()
                }
                console.log(error)
            })
    }
}

export const subscribeAction =
    (
        stripe,
        elements,
        CardElement,
        amount,
        plan,
        navigate
    ) =>
    async (dispatch) => {
        try {
            dispatch({ type: SUBSCRIBE_REQUEST })

            const {accessToken : token, verificationHash} = store.getState().userLoginReducer

            const config = {
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer ' + token,
                },
            }

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            })

            if (!error) {
                try {
                    const { id } = paymentMethod
                    console.log(id)
                    // navigate('checkout')

                    const { data } = await axios.post(
                        `${BACKEND_URL}/user/stripe/payment`,
                        {
                            amount,
                            id,
                            payment_method: id,
                            verificationHash,
                            planDetails: plan,
                            planType: plan.planType
                        },
                        config
                    )
                    // console.log(data.clientSecret)
                    // console.log(elements.getElement(CardElement))
                    if(data.status === 200){
                        // const confirmPayment = await stripe.confirmCardPayment(
                        //     data.clientSecret,
                        //     {
                        //         payment_method: {
                        //             card: elements.getElement(CardElement),
                        //         },
                        //     },
                        //     {handleActions: false}
                        // )

                        // const { paymentIntent } = confirmPayment

                        // if (paymentIntent?.status === 'succeeded') {
                            navigate('/payment/checkout')
                            dispatch({
                                type: SUBSCRIBE_SUCCESS,
                                payload: data.data,
                            })
                            await dispatch(updateLocalUserInfo())
                            dispatch(deleteSelection())
                        // } else {
                        //     await dispatch(updateLocalUserInfo())
                        //     dispatch({
                        //         type: SUBSCRIBE_FAILED,
                        //         payload: 'Payment Failed!',
                        //     })
                        // }
                            dispatch(openToast(true, 'Subscribed!', data.msg, false))
                    }else{
                        dispatch({
                            type: SUBSCRIBE_FAILED,
                            payload: data.msg,
                        })
                        dispatch(openToast(true, 'Something Failed!', data.msg, true))
                    }
                } catch (error) {
                    console.log('error', error)
                    dispatch({
                        type: SUBSCRIBE_FAILED,
                        payload: error.toString()
                    })
                    dispatch(openToast(true, 'Something Failed!', error.toString(), true))
                }
            } else {
                console.log('FAILED')
                dispatch({
                    type: SUBSCRIBE_FAILED,
                    payload: error.message
                })
                dispatch(openToast(true, 'Something Failed!', error.message, true))
            }
        } catch (error) {
            dispatch({
                type: SUBSCRIBE_FAILED,
                payload: ErrorMessage(error)
            })
            dispatch(openToast(true, 'Something Failed!', ErrorMessage(error), true))
        }
    }

export const unsubscribeAction = (navigate) => async (dispatch) => {
        try {
            dispatch({ type: UNSUBSCRIBE_REQUEST })

            const {accessToken : token, verificationHash} = store.getState().userLoginReducer

            const config = {
                headers: {
                    'content-type': 'application/json',
                    authorization: 'Bearer ' + token,
                },
            }

            const { data } = await axios.post(
                `${BACKEND_URL}/user/stripe/cancelStripePayment`,
                {
                    verificationHash,
                },
                config
            )

            if(data.status === 200){
                navigate('/payment/checkout')
                dispatch({
                    type: UNSUBSCRIBE_SUCCESS,
                    payload: data.data,
                })
                await dispatch(updateLocalUserInfo())
                dispatch(deleteSelection())
                dispatch(openToast(true, 'Unsubscribed!', 'You have Succesfully Unsubscribed!', false))
            }else{
                dispatch({
                    type: UNSUBSCRIBE_FAILED,
                    payload: data.msg,
                })
                dispatch(openToast(true, 'Something Failed!', data.msg, true))
            }
        } catch (error) {
            dispatch({
                type: UNSUBSCRIBE_FAILED,
                payload: ErrorMessage(error)
            })
            dispatch(openToast(true, 'Something Failed!', ErrorMessage(error), true))
        }
    }

export const getAllPlans = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PLANS_REQUEST })

        const config = {
            headers: {
                'content-type': 'application/json',
            },
        }

        const { data } = await axios.get(
            `${BACKEND_URL}/user/getPlans`,
            config
        )

        dispatch({
            type: GET_PLANS_SUCCESS,
            payload: data.plans || [],
        })
    } catch (error) {
        dispatch({
            type: GET_PLANS_FAILED,
            payload: ErrorMessage(error)
        })
    }
}

export const selectPlan = (plan) => async(dispatch) => {
    dispatch({
        type: SUBSCRIBTION_PLAN,
        payload: plan
    })
}

export const deleteSelection = () => async(dispatch) => {
    dispatch({
        type: SUBSCRIBTION_PLAN,
        payload: null
    })
}

export const openToast =
    (open, msg, heading, error = false) =>
    async (dispatch) => {
        dispatch({
            type: OPEN_TOAST,
            open: open,
            msg: heading,
            heading: msg,
            error: error,
        })
    }

export const openToastReset = () => async(dispatch) => {
    dispatch({
        type: OPEN_TOAST_RESET,
    })
}

export const logout = () => async(dispatch) => {
    localStorage.clear()
    dispatch({
        type: USER_LOGOUT
    })
}