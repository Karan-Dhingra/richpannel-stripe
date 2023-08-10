import { useNavigate } from 'react-router-dom'
import styles from './SubscriptionPlans.module.css'
import React, { useState } from 'react'
import { selectPlan } from '../../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'

const SubscriptionPlans = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {userInfo} = useSelector((state) => state.userLoginReducer)
    const { loading, plans: plansInfo } = useSelector((state) => state.getPlansReducer)

    const [activePlan, setActivePlan] = useState('Mobile')
    const [planType, setPlanType] = useState('Monthly')

    if(loading || plansInfo?.length === 0){
        return <div className='h-full w-full flex items-center justify-center'>
            <div className='flex items-center flex-col gap-2'>
                <Loader size="3rem" style={{color: '#1F4D91'}} />
                <span className='opacity-80 text-[14px]'>Loading...</span>
            </div>
        </div>
    }
    return (
        <div className={styles.page_wrapper}>
            <h1 className={styles.heading}>Choose the right plan for you</h1>

            {plansInfo?.length > 0 && <main className={styles.subscription_container}>
                <div className={styles.heading_holder}>
                    <div className={styles.header}>
                        <div className={styles.switch_holder}>
                            <div className={`${styles.switch_btn} ${planType === 'Monthly' ? styles.left : styles.right}`}>
                                <button className={planType === 'Monthly' ? styles.btn_txt_slctd : styles.btn_txt} onClick={() => setPlanType('Monthly')}>Monthly</button>
                                <button className=  {planType === 'Yearly' ? styles.btn_txt_slctd : styles.btn_txt} onClick={() => setPlanType('Yearly')}>Yearly</button>
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
                        ₹{' '}{planType === 'Monthly' ? plan.monthlyPrice : plan.yearlyPrice}
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
            </main>}

            {plansInfo?.length > 0 && <div className='flex items-center flex-col gap-2'>
                <button className={styles.next_btn} onClick={() => {
                    dispatch(selectPlan({...plansInfo.filter(planInfo => planInfo.planName === activePlan)[0], planType}))
                    navigate('/payment')
                }}>Next</button>

                {userInfo?.planName && <button className='opacity-80 text-[12px] italic underline' onClick={() => navigate('/payment/checkout')}>{userInfo?.isSubscribed ? 'You have already subscribed!' : 'Your Previous Plan!'}</button>}
            </div>}
        </div>
    )
}

export default SubscriptionPlans