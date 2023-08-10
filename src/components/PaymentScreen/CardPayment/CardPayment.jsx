// import React, { useState } from 'react'
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js'
import styles from './CardPayment.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { subscribeAction } from '../../../redux/actions/userActions'
import Loader from '../../Loader/Loader'

const CardPayment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()

    const {loading} = useSelector((state) => state.subscribeReducer)
    const {currentPlan} = useSelector((state) => state.subscribePlansReducer)

    // const [cardLoading, setCardLoading] = useState(true)

    const handleSubmit = async (e) => {
        e?.preventDefault()

        if (!stripe || !elements) {
            return
        }

        dispatch(subscribeAction(stripe, elements, CardElement, currentPlan?.planType === 'Monthly' ? currentPlan?.monthlyPrice : currentPlan?.yearlyPrice, currentPlan, navigate))
    }

    // if(cardLoading)
    //     return <div className={styles.payment_card} style={{height: '300px', alignItems: 'center', justifyContent: 'center'}}>
    //         <Loader style={{color: '#1F4D91'}} size="3rem" />
    //     </div>

    return (
        <div className={styles.payment_card}>
            <form onSubmit={handleSubmit} className={styles.card_form}>
                <div className='flex flex-col'>
                    <h1>Complete Payment</h1>
                    <p>Enter your credit or debit card details below</p>
                </div>

                <div className={styles.card_payment_holder}>
                        <CardElement
                            // onReady={() => {setCardLoading(false)}}
                            id="card-element"
                            options={{
                                hidePostalCode: true,
                            }}
                        />
                </div>

                <div className={`flex flex-col gap-2`}>
                    <button type='submit' className={styles.confirm_payment} disabled={loading} >{loading && <Loader style={{color: '#FFF'}} size={"1rem"} /> }{loading ? 'Confirming...' : 'Confirm Payment'}</button>
                    <p className='opacity-80 text-[12px] italic'>Confirming Will Update <span className='underline underline-offset-1 cursor-pointer' onClick={() => navigate('/payment/checkout')}>Current</span> Plan</p>
                </div>

            </form>

            <div className={styles.order_summary}>
                <h1>Order Summary</h1>
                <div className='flex w-full flex-col'>
                    <div className={styles.row_align}>
                        <h2>Plan Name</h2>
                        <h3>{currentPlan?.planName}</h3>
                    </div>
                    <div className={styles.row_align}>
                        <h2>Billing Cycle</h2>
                        <h3>{currentPlan?.planType}</h3>
                    </div>
                    <div className={styles.row_align}>
                        <h2>Plan Price</h2>
                        <h3>₹{' '}{currentPlan?.planType === 'Monthly' ? `${currentPlan?.monthlyPrice}/mo` : `${currentPlan?.yearlyPrice}/yr`}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPayment
