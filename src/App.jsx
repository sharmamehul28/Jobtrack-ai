import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/AddApplication'
import EditApplication from './pages/EditApplication'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications/new" element={<AddApplication />} />
          <Route path="/applications/:id/edit" element={<EditApplication />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App