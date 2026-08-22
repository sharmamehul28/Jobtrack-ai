import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Signup() {
  const { signUp } = useAuth()
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
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setSubmitting(true)
    const { data, error: signUpError } = await signUp(email.trim(), password)
    setSubmitting(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data?.user) {
      navigate('/dashboard')
    } else {
      setError('Signup succeeded, but no session was returned. Try logging in.')
    }
  }

  return (
    <div
      className="page-container"
      style={{ maxWidth: '360px', margin: '60px auto', border: '1px solid var(--border-color)', background: 'var(--bg-card)', borderRadius: '8px' }}
    >
      <h1 style={{ fontSize: '22px', marginBottom: '20px', color: 'var(--text-primary)' }}>Sign Up</h1>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)', borderRadius: '6px', fontSize: '14px', marginTop: '4px', marginBottom: '16px', boxSizing: 'border-box' }}
        />

        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)', borderRadius: '6px', fontSize: '14px', marginTop: '4px', marginBottom: '20px', boxSizing: 'border-box' }}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{ width: '100%', padding: '10px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          {submitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ fontSize: '13px', marginTop: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--accent)' }}>Log in</Link>
      </p>
    </div>
  )
}

export default Signup