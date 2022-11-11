import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './features/auth/Login'
import HomePage from './Layouts/HomePage'
import { Student } from './models'

function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}  />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to="/login" replace />} />
        </Routes>
        </BrowserRouter>
      )}
    </div>
  )
}

export default App
