import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        limit={1}
        closeButton={true}
        autoClose={4000}
        hideProgressBar
      />
    </BrowserRouter>
  </React.StrictMode>,
)
