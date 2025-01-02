import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import EmailVerification from './components/EmailVerification'
import Login from './components/Login'

const App = () => {
  return (
    <Router>
      <div>
      <Toaster position='top-center' />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/verify-email/:uid/:token' element={<EmailVerification />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App