import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/auth'
import Admin from './pages/Admin'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import AdminRoutes from './utils/AdminRoutes'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {

  return (
    <div className='container m-auto w-11/12'>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/profile"} element={<Profile />} />
            <Route element={<AdminRoutes />}>
              <Route path="/admin/*" element={<Admin />} />
            </Route>
          </Route>
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
