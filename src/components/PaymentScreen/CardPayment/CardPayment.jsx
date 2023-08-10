import React, { useState } from 'react'
import {
    useStripe,
    useElements,
    CardElement,
} from '@stripe/react-stripe-js'
import styles from './CardPayment.module.css'
import { useNavigate } from 'react-router-dom'

const CardPayment = () => {
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()

    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async (e) => {
        e?.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        })

        if (!error) {
            try {
                console.log(paymentMethod)
                const { id } = paymentMethod
                console.log(id)
                navigate('checkout')

                // dispatch(
                //     placeOrderAction(
                //         id,
                //         merchCount,
                //         checkoutData.totalPrice +
                //             getShippingPrice(data?.orderDetails?.country, cartData.weight),
                //         shippingAddress,
                //         userDetails,
                //         order,
                //         toggleDrawer,
                //         setCheckout,
                //         setStep,
                //         step,
                //         setPaymentCompleteModal,
                //         setPaymentFailedModal,
                //         SetTransactionProgress,
                //         setPaymentPausedModal,
                //         stripe,
                //         elements,
                //         CardNumberElement
                //     )
                // )
            } catch (error) {
                console.log('Error', error)
                setErrorMessage(error)
                // SetTransactionProgress(false)
                // setPaymentFailedModal({
                //     status: true,
                //     data: error,
                // })
            }
        } else {
            console.log(error.message)
            setErrorMessage(error.message)
        }
    }

    return (
        <div className={styles.payment_card}>
            <form onSubmit={handleSubmit} className={styles.card_form}>
                <div className='flex flex-col'>
                    <h1>Complete Payment</h1>
                    <p>Enter your credit or debit card details below</p>
                </div>

                <div className={styles.card_payment_holder}>
                        <CardElement id="card-element"  options={{
                            hidePostalCode: true,
                        }} />
                </div>
                <button type='submit' className={styles.confirm_payment}>Confirm Payment</button>
                {/* <pre>{errorMessage}	</pre> */}
            </form>

            <div className={styles.order_summary}>
                <h1>Order Summary</h1>
                <div className='flex w-full flex-col'>
                    <div className={styles.row_align}>
                        <h2>Plan Name</h2>
                        <h3>Basic</h3>
                    </div>
                    <div className={styles.row_align}>
                        <h2>Billing Cycle</h2>
                        <h3>Monthly</h3>
                    </div>
                    <div className={styles.row_align}>
                        <h2>Plan Price</h2>
                        <h3>200/mo</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardPayment
