import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import LandingPage from './components/LandingPage/LandingPage'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './components/Common/Forms/Signup'
import Login from './components/Common/Forms/Login'
import Home from './components/Dashboard/Components/Homepage/Home'
import Expenses from './components/Dashboard/Components/Expenses/Expenses'
import Investments from './components/Dashboard/Components/Investments/Investments'
import Debts from './components/Dashboard/Components/Debts/Debts'
import NotFound from './components/NotFound'
import Profile from './components/Dashboard/ProfileComponent/Profile'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/debts' element={<Debts />} />
        <Route path='/investments' element={<Investments />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App