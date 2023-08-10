import { Elements } from '@stripe/react-stripe-js'
import styles from './PaymentPage.module.css'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import CardPayment from '../../components/PaymentScreen/CardPayment/CardPayment'

const stripePromise = loadStripe('pk_test_51J8k41SCFPXzgBgtCfWLL6TzgedX6g7ACVpEhqk6LGFvfm05X1Q1X2Mgdqs5mOBEvor6XHaafA6B3EabUX5rl1iM00sePUaWMm')
// const options = {
//     mode: 'payment',
//     amount: 1099,
//     currency: 'usd',
//     // Fully customizable with appearance API.
//     appearance: {
//         /*...*/
//     },
// }

const PaymentPage = () => {
    return (
        <div className={styles.page_wrapper}>
            <Elements stripe={stripePromise}>
                <CardPayment />
            </Elements>
        </div>
    )
}

export default PaymentPage