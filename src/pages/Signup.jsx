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
    <div style={{ maxWidth: '360px', margin: '80px auto', padding: '32px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <h1 style={{ fontSize: '22px', marginBottom: '20px' }}>Sign Up</h1>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: '13px', fontWeight: 600 }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', marginTop: '4px', marginBottom: '16px', boxSizing: 'border-box' }}
        />

        <label style={{ fontSize: '13px', fontWeight: 600 }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px', marginTop: '4px', marginBottom: '20px', boxSizing: 'border-box' }}
        />

        <button
          type="submit"
          disabled={submitting}
          style={{ width: '100%', padding: '10px', background: '#1e2761', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          {submitting ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ fontSize: '13px', marginTop: '16px', textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  )
}

export default Signup