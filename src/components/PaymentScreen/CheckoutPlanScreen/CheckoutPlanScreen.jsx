import styles from './CheckoutPlanScreen.module.css'
import React, {useState} from 'react'

const CheckoutPlanScreen = () => {
    const [status, setStatus] = useState('Active')

    const handleCancel = () => {
        setStatus('Cancelled')
    }

    return <div className={styles.checkout_card}>
        <div className={styles.top_heading}>
            <div className='flex items-center gap-2'>
                <h1 className={styles.heading}>Current Plan Details</h1>
                <span className={status === 'Active' ? styles.activeStatus : styles.cancelStatus}>{status}</span>
            </div>
            {status === 'Active' && <button className={styles.cancel_btn} onClick={handleCancel}>Cancel</button>}
        </div>

        <div className={styles.main_details}>
            <div className='flex flex-col'>
                <h2 className={styles.plan_name}>Basic</h2>
                <h3 className={styles.plan_devices}>Phone + Tablet</h3>
            </div>

            <div className={styles.main_amt}>
                <h1>2000</h1>
                <span>/yr</span>
            </div>

            <button className={styles.change_plan_btn}>{status === 'Active' ? 'Change Plan' : 'Choose Plan'}</button>
        </div>

        <p className={styles.footer_txt}>Your susbcription has started on {new Date(Date.now()).toDateString()} and will renew on {new Date(Date.now()).toDateString()}.</p>
    </div>
}

export default CheckoutPlanScreen
