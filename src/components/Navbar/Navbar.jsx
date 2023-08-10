import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actions/userActions'

const Navbar = () => {
    const dispatch = useDispatch()

    return (
        <div className='absolute right-3 top-1'>
            <button className='logout_btn opacity-80 text-[12px] underline' onClick={() => {dispatch(logout())}}>Logout?</button>
        </div>
    )
}

export default Navbar
