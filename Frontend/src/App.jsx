import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login/Login'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
import {Routes, Route } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './Context/AuthContext'

function App() {
  const{authuser} = useAuthContext()
  

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={authuser ? <Navigate to = "/"/> :<SignUp/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
