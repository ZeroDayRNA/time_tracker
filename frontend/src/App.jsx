import { useState } from 'react'
import './App.css'
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Calendar from './pages/Calendar'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

function Logout() {
  localStorage.clear()
  return <Navigate to='/login'/>
}

function RegisterAndLogout(){
  localStorage.clear()
  return <Register/>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"></meta>
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Calendar></Calendar>
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={<Login/>}
        />
        <Route
          path='/register'
          element={<RegisterAndLogout/>}
        />
        <Route
          path='/logout'
          element={<Logout/>}
        />
        <Route
          path='*'
          element={<NotFound/>}
        />                    
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import 'bootstrap/dist/css/bootstrap.min.css';