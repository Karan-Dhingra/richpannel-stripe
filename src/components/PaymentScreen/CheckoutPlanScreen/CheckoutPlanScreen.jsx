import styles from './CheckoutPlanScreen.module.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unsubscribeAction } from '../../../redux/actions/userActions';

const CheckoutPlanScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {userInfo} = useSelector((state) => state.userLoginReducer)
    const {loading} = useSelector((state) => state.unsubscribeReducer)

    const handleCancel = () => {
        // setStatus('Cancelled')
        dispatch(unsubscribeAction(navigate))
    }

    const handleSwitchPlans = () => {
        navigate('/plans')
    }

    return <div className={styles.checkout_card}>
        <div className={styles.top_heading}>
            <div className='flex items-center gap-2'>
                <h1 className={styles.heading}>Current Plan Details</h1>
                <span className={userInfo?.isSubscribed ? styles.activeStatus : styles.cancelStatus}>{userInfo?.isSubscribed ? 'Active': 'Cancelled'}</span>
            </div>
            {userInfo?.isSubscribed  && <button className={styles.cancel_btn} onClick={handleCancel} disabled={loading}>{loading ? 'Canceling...' : 'Cancel'}</button>}
        </div>

        <div className={styles.main_details}>
            <div className='flex flex-col'>
                <h2 className={styles.plan_name}>{userInfo?.planDetails?.planName}</h2>
                <h3 className={styles.plan_devices}>{userInfo?.planDetails?.devices?.join(" + ")}</h3>
            </div>

            <div className={styles.main_amt}>
                <h1>₹ {userInfo?.planDetails?.planType === 'Monthly' ? userInfo?.planDetails?.monthlyPrice : userInfo?.planDetails?.yearlyPrice}</h1>
                <span>/{userInfo?.planType === 'Monthly' ? 'month' : 'yr'}</span>
            </div>

            <button className={styles.change_plan_btn} onClick={handleSwitchPlans}>{userInfo?.isSubscribed  ? 'Change Plan' : 'Choose Plan'}</button>
        </div>

        {userInfo?.isSubscribed && <p className={styles.footer_txt}>Your susbcription has started on {new Date(parseInt(userInfo?.enrolledDate) || 0).toDateString()} and will renew on {new Date(userInfo?.planType === 'Month' ? parseInt(userInfo?.enrolledDate) + 2629743833 : parseInt(userInfo?.enrolledDate) + 31556926000).toDateString()}.</p>}
        {!userInfo?.isSubscribed && <p className={styles.footer_txt}>Your susbcription has canceled on {new Date(parseInt(userInfo?.canceledOn) || 0).toDateString()}.</p>}
    </div>
}

export default CheckoutPlanScreen
