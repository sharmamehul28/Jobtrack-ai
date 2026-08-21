import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/AddApplication'
import EditApplication from './pages/EditApplication'
import ResumeVersions from './pages/ResumeVersions'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications/new"
                element={
                  <ProtectedRoute>
                    <AddApplication />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/applications/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditApplication />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume-versions"
                element={
                  <ProtectedRoute>
                    <ResumeVersions />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App