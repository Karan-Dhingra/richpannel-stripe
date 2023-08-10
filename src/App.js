import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import SubscriptionPlans from './pages/SubscriptionPlans/SubscriptionPlans';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/plans' element={<SubscriptionPlans />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/payment/checkout' element={<CheckoutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
