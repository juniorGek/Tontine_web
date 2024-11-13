import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './i18n.js'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { WelcomeProvider } from './hook/WelcomeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    
      <WelcomeProvider>
        <App />
      </WelcomeProvider>
      
    </BrowserRouter>
    
  </React.StrictMode>,
)
