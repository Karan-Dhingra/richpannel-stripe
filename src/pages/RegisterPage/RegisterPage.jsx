import { Link } from 'react-router-dom'
import Input from '../../components/shared/Input/Input'
import styles from './RegisterPage.module.css'
import React from 'react'

const RegisterPage = () => {
    return (
        <div className={styles.screen_wrapper}>
            <div className={styles.main_content}>
                <h1 className={styles.heading}>Create Account</h1>

                <div className={styles.form}>
                    {/* Name */}
                    <Input label={'Name'} />
                    {/* Email */}
                    <Input label={'Email'} />
                    {/* Password */}
                    <Input label={'Password'} />

                    {/* Remember Me */}
                    <div className='flex items-center gap-1'>
                        <span className={styles.remember_me}>Remeber Me</span>
                    </div>

                    <button className={styles.button}>Sign Up</button>
                </div>

                <div className={`flex items-center gap-1`}>
                    <span className={styles.footer_text}>Already have an account?</span>
                    <Link to='/' className={styles.footer_text_ul}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage