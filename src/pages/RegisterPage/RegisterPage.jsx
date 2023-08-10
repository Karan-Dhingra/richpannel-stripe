import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/shared/Input/Input'
import styles from './RegisterPage.module.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openToast, register } from '../../redux/actions/userActions'

const RegisterPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [userForm, setUserForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        checked: false,
    })

    const {loading} = useSelector((state) => state.userRegisterReducer)

    const handleSubmit = (e) => {
        e?.preventDefault()
        if(userForm.password !== userForm.confirmPassword){
            dispatch(openToast(true, 'Fill Credentials properly!', `Password doesn't matched`, true))
            return
        }
        dispatch(register(userForm, navigate))
    }

    return (
        <div className={styles.screen_wrapper}>
            <div className={styles.main_content}>
                <h1 className={styles.heading}>Create Account</h1>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* Name */}
                    <Input label={'Name'} required type='text' value={userForm.username} onChange={(e) => {setUserForm((prev) => ({...prev, username: e.target.value}))}} />
                    {/* Email */}
                    <Input label={'Email'} required type='email' value={userForm.email} onChange={(e) => {setUserForm((prev) => ({...prev, email: e.target.value}))}} />
                    {/* Password */}
                    <Input label={'Password'} required type='password' value={userForm.password} onChange={(e) => {setUserForm((prev) => ({...prev, password: e.target.value}))}} />
                    {/* Confirm Password */}
                    <Input label={'Confirm Password'} required type='password' value={userForm.confirmPassword} onChange={(e) => {setUserForm((prev) => ({...prev, confirmPassword: e.target.value}))}} />

                    {/* Remember Me */}
                    {/* <div className='flex items-center gap-1'>
                        <input type="checkbox" value={userForm.checked} onChange={(e) => setUserForm((prev) => ({...prev, checked: e.target.checked}))} />
                        <span className={styles.remember_me}>Remeber Me</span>
                    </div> */}

                    <button type='submit' className={styles.button} disabled={loading}>{loading ? 'Signing...' : 'Sign Up'}</button>
                </form>

                <div className={`flex items-center gap-1`}>
                    <span className={styles.footer_text}>Already have an account?</span>
                    <Link to='/' className={styles.footer_text_ul}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage