import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SubscriptionPlans from './pages/SubscriptionPlans/SubscriptionPlans';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { useDispatch, useSelector } from 'react-redux';
import Toast from './components/shared/Toasts/Toast';
import { useEffect } from 'react';
import { getAllPlans, updateLocalUserInfo } from './redux/actions/userActions';
import Navbar from './components/Navbar/Navbar';

function App() {
  const dispatch = useDispatch()

  const {isLogin, expiresAt, dontAllowRefresh, userInfo} = useSelector((state) => state.userLoginReducer)
  const { open } = useSelector((state) => state.toastHandleReducer)
  const { currentPlan } = useSelector((state) => state.subscribePlansReducer)
  const { plans } = useSelector((state) => state.getPlansReducer)

  // Auto Logout
  useEffect(() => {
    const currentTime = new Date().getTime()

    const autoLogout = () => {
        localStorage.clear()
        window.location.reload()
    }

    if (expiresAt && currentTime > expiresAt) {
        autoLogout()
    }

    if (expiresAt) {
        const timeout = expiresAt - currentTime
        setTimeout(() => {
            autoLogout()
        }, timeout)
    }

    if (isLogin && !dontAllowRefresh) dispatch(updateLocalUserInfo())
  }, [isLogin, expiresAt, dispatch, dontAllowRefresh])

  useEffect(() => {
    if(isLogin && plans?.length === 0)
        dispatch(getAllPlans())
  }, [isLogin, dispatch])

  return (
    <div className='app'>
      <Router>
        {isLogin && <Navbar />}
        <Routes>
          <Route path='/' element={isLogin ? <Navigate to='/plans' /> : <Navigate to='/login' />} />
          <Route path='/login' element={isLogin ? <Navigate to='/' /> : <LoginPage />} />
          <Route path='/register' element={isLogin ? <Navigate to='/' /> : <RegisterPage />} />
          <Route path='/plans' element={isLogin ? <SubscriptionPlans /> : <Navigate to ='/login' />} />
          <Route path='/payment' element={isLogin && currentPlan ? <PaymentPage /> : <Navigate to ='/login' />} />
          <Route path='/payment/checkout' element={isLogin && userInfo?.planName ? <CheckoutPage /> : <Navigate to ='/login' />} />
        </Routes>
        {open && <Toast />}
      </Router>
    </div>
  );
}

export default App;
