import React from 'react'
import styles from './LoginPage.module.css'
import Input from '../../components/shared/Input/Input'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/plans')
    }

    return (
        <div className={styles.screen_wrapper}>
            <div className={styles.main_content}>
                <h1 className={styles.heading}>Login to your account</h1>

                <div className={styles.form}>
                    {/* Email */}
                    <Input label={'Email'} />
                    {/* Password */}
                    <Input label={'Password'} />

                    {/* Remember Me */}
                    <div className='flex items-center gap-1'>
                        <span className={styles.remember_me}>Remeber Me</span>
                    </div>

                    <button className={styles.button} onClick={handleLogin}>Login</button>
                </div>

                <div className={`flex items-center gap-1`}>
                    <span className={styles.footer_text}>New to MyApp?</span>
                    <Link to='/register' className={styles.footer_text_ul}>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage