import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import LandingPage from './components/LandingPage/LandingPage';
import Signup from './components/Common/Forms/Signup';
import Login from './components/Common/Forms/Login';
import Home from './components/Dashboard/Components/Homepage/Home';
import Expenses from './components/Dashboard/Components/Expenses/Expenses';
import Investments from './components/Dashboard/Components/Investments/Investments';
import Debts from './components/Dashboard/Components/Debts/Debts';
import NotFound from './components/NotFound';
import Profile from './components/Dashboard/ProfileComponent/Profile';
import ForgotPassword from './components/Common/Forms/ForgotPassword';
import ResetPassword from './components/Common/Forms/ResetPassword';
import { ResetProvider, useResetContext } from './components/Common/Forms/ResetContext';

const ProtectedResetRoute = ({ children }) => {
  const { resetAllowed } = useResetContext();
  console.log('state at app.jsx',resetAllowed)
  return resetAllowed ? children : <Navigate to="/forgotpassword" />;
};

const App = () => {
  return (
    <ResetProvider>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/debts' element={<Debts />} />
        <Route path='/investments' element={<Investments />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        
        <Route
          path='/reset'
          element={
            <ProtectedResetRoute>
              <ResetPassword />
            </ProtectedResetRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </ResetProvider>
  );
};

export default App;
