import styles from './CheckoutPage.module.css'
import React from 'react'
import CheckoutPlanScreen from './../../components/PaymentScreen/CheckoutPlanScreen/CheckoutPlanScreen';

const CheckoutPage = () => {
    return <div className={styles.page_wrapper}>
            <CheckoutPlanScreen />
    </div>
}

export default CheckoutPage
