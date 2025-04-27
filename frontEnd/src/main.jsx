// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './components/Common/LoadingContext.jsx'
import { ResetProvider } from './components/Common/Forms/ResetContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LoadingProvider>
      <ResetProvider>
        <App />
      </ResetProvider>
    </LoadingProvider>
  </BrowserRouter>
)
