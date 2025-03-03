import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import LandingPage from './components/LandingPage/LandingPage'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
const App = () => {
  return (
    <>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </>
  )
}

export default App