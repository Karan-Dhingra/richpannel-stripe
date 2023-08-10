import { useNavigate } from 'react-router-dom'
import { plansInfo } from '../../data/pricingDetails'
import styles from './SubscriptionPlans.module.css'
import React, { useState } from 'react'

const SubscriptionPlans = () => {
    const navigate = useNavigate()

    const [activePlan, setActivePlan] = useState('Mobile')
    const [planType, setPlanType] = useState('MONTHLY')

    return (
        <div className={styles.page_wrapper}>
            <h1 className={styles.heading}>Choose the right plan for you</h1>

            <main className={styles.subscription_container}>
                <div className={styles.heading_holder}>
                    <div className={styles.header}>
                        <div className={styles.switch_holder}>
                            <div className={`${styles.switch_btn} ${planType === 'MONTHLY' ? styles.left : styles.right}`}>
                                <button className={planType === 'MONTHLY' ? styles.btn_txt_slctd : styles.btn_txt} onClick={() => setPlanType('MONTHLY')}>Monthly</button>
                                <button className=  {planType === 'YEARLY' ? styles.btn_txt_slctd : styles.btn_txt} onClick={() => setPlanType('YEARLY')}>Yearly</button>
                            </div>
                        </div>
                        <div className={`${styles.grid_row}`} style={{justifyContent: 'flex-start', opacity: 0.85}} >
                            Monthly Price
                        </div>
                        <div className={`${styles.grid_row}`} style={{justifyContent: 'flex-start', opacity: 0.85}} >
                            Video Quality
                        </div>
                        <div className={`${styles.grid_row}`} style={{justifyContent: 'flex-start', opacity: 0.85}} >
                            Resolution
                        </div>
                        <div className={`${styles.grid_col}`} style={{alignItems: 'flex-start', opacity: 0.8, fontSize: '14px', paddingTop: '10px'}} >
                            Devices you can use to watch
                        </div>
                    </div>
                </div>
                {plansInfo?.map((plan, key) => (
                    <div className={styles.subscription_detail} key={key}>
                        <button className={styles.planNameBox_outer} onClick={() => setActivePlan(plan.planName)}>
                            <div className={`${plan.planName === activePlan && styles.planNameBox_selected} ${styles.planNameBox}`}>{plan.planName}</div>
                        </button>

                        <div className={`${styles.grid_row}`} style={{opacity: plan.planName === activePlan ? '1' : '', color: activePlan === plan.planName ? '#1f4c91' : ''}}>
                        ₹{' '}{planType === 'MONTHLY' ? plan.monthlyPrice : plan.yearlyPrice}
                        </div>
                        <div className={`${styles.grid_row}`} style={{opacity: plan.planName === activePlan ? '1' : '', color: activePlan === plan.planName ? '#1f4c91' : ''}}>
                            {plan.videQuality}
                        </div>
                        <div className={`${styles.grid_row}`} style={{opacity: plan.planName === activePlan ? '1' : '', color: activePlan === plan.planName ? '#1f4c91' : ''}}>
                            {plan.resolution}
                        </div>
                        <div className={`${styles.grid_col}`} style={{opacity: plan.planName === activePlan ? '1' : '', color: activePlan === plan.planName ? '#1f4c91' : ''}}>
                            {plan.devices?.map((device, key) => (
                                <div className={styles.device_name} key={key}>
                                    {device}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            <button className={styles.next_btn} onClick={() => navigate('/payment')}>Next</button>
        </div>
    )
}

export default SubscriptionPlans