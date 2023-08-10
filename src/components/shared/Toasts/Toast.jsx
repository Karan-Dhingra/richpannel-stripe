import { Alert, Snackbar } from '@mui/material'
import styles from './Toast.module.css'
import React from 'react'
import ErrorToast from '../../../assets/svg/ErrorToast.svg'
import SuccessToast from '../../../assets/svg/SuccessToast.svg'
import { useDispatch, useSelector } from 'react-redux'
import { openToastReset } from '../../../redux/actions/userActions'

const Toast = () => {
    const dispatch = useDispatch()
    const { msg, open, error, heading } = useSelector(
        (state) => state.toastHandleReducer
    )
    const { vertical, horizontal } = {
        vertical: 'bottom',
        horizontal: 'right',
    }

    const handleClose = () => {
        dispatch(openToastReset())
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            disableWindowBlurListener={true}
            // TransitionComponent={TransitionLeft}
            // TransitionProps={}
            message={msg}
            transitionDuration={500}
        >
            <Alert
                // onClose={handleClose}
                icon={false}
                // severity={error ? 'error' : 'success'}
                // sx={{
                //     width: '100%',
                //     background: error ? '#ea0b0b' : '#dedede',
                //     color: '#111',
                //     paddingTop: '16px',
                //     paddingBottom: '16px',
                // }}
                className={`${styles.toast} ${error ? styles.toast_err : ''}`}
            >
                {error ? <ErrorSvg /> : <SuccessSvg />}
                <div className={styles.toast__content}>
                    <p className='font-[700] text-[18px] mb-1'>{heading}</p>
                    <p className='text-[14px]'>{msg}</p>
                </div>
            </Alert>
        </Snackbar>
    )
}

export default Toast

const SuccessSvg = () => {
    return (
        <div className={styles.toast__icon}>
            <img src={SuccessToast} alt='' />
        </div>
    )
}

const ErrorSvg = () => {
    return (
        <div className={styles.toast__icon}>
            <img src={ErrorToast} alt='' />
        </div>
    )
}
