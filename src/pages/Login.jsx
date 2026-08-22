import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter both email and password.')
      return
    }

    setSubmitting(true)
    const { data, error: signInError } = await signIn(email.trim(), password)
    setSubmitting(false)

    if (signInError) {
      console.error('Login failed:', signInError)
      setError('Incorrect email or password.')
      return
    }

    if (data?.user) {
      navigate('/dashboard')
    }
  }

  return (
    <div
      className="page-container"
      style={{ maxWidth: '360px', margin: '60px auto', border: '1px solid var(--border-color)', background: 'var(--bg-card)', borderRadius: '8px' }}
    >
      <h1 style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--text-primary)' }}>Log In</h1>

      {error && (
        <div role="alert" style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Email
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)', borderRadius: '6px', fontSize: '14px', marginTop: '4px', marginBottom: '16px', boxSizing: 'border-box' }}
        />

        <label htmlFor="login-password" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)', borderRadius: '6px', fontSize: '14px', marginTop: '4px', marginBottom: '20px', boxSizing: 'border-box' }}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{ width: '100%', padding: '10px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          {submitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>

      <p style={{ fontSize: '13px', marginTop: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)' }}>Sign up</Link>
      </p>
    </div>
  )
}

export default Login