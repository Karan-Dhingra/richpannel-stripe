import React, { useState } from 'react'
import styles from './LoginPage.module.css'
import Input from '../../components/shared/Input/Input'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/actions/userActions'

const LoginPage = () => {
    const dispatch = useDispatch()
    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
        checked: false
    })

    const {loading} = useSelector((state) => state.userLoginReducer)

    const handleLogin = (e) => {
        e?.preventDefault()

        dispatch(login(userForm))
    }

    return (
        <div className={styles.screen_wrapper}>
            <div className={styles.main_content}>
                <h1 className={styles.heading}>Login to your account</h1>

                <form className={styles.form} onSubmit={handleLogin}>
                    {/* Email */}
                    <Input label={'Email'} type='email' required value={userForm.email} onChange={(e) => setUserForm((prev) => ({...prev, email: e.target.value}))} />
                    {/* Password */}
                    <Input label={'Password'} type='password' required value={userForm.password} onChange={(e) => setUserForm((prev) => ({...prev, password: e.target.value}))} />

                    {/* Remember Me */}
                    <div className='flex items-center gap-1'>
                        <input type="checkbox" value={userForm.checked} onChange={(e) => setUserForm((prev) => ({...prev, checked: e.target.checked}))} />
                        <span className={styles.remember_me}>Remeber Me</span>
                    </div>

                    <button className={styles.button} type='submit' disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
                </form>

                <div className={`flex items-center gap-1`}>
                    <span className={styles.footer_text}>New to MyApp?</span>
                    <Link to='/register' className={styles.footer_text_ul}>Sign Up</Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage