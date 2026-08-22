import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AddApplication from './pages/AddApplication'
import EditApplication from './pages/EditApplication'
import ResumeVersions from './pages/ResumeVersions'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-page)' }}>
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/applications/new" element={<ProtectedRoute><AddApplication /></ProtectedRoute>} />
                <Route path="/applications/:id/edit" element={<ProtectedRoute><EditApplication /></ProtectedRoute>} />
                <Route path="/resume-versions" element={<ProtectedRoute><ResumeVersions /></ProtectedRoute>} />
              </Routes>
            </div>
            <Footer />
            <ThemeToggle />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App