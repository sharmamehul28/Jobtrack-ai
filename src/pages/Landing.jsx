import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="page-container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(28px, 5vw, 40px)', marginBottom: '12px' }}>
        JobTrack AI
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(15px, 3vw, 18px)', marginBottom: '32px' }}>
        A focused job-search command center for students and freshers.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          to="/signup"
          style={{
            padding: '12px 24px',
            background: 'var(--accent)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Get Started Free
        </Link>
        <Link
          to="/login"
          style={{
            padding: '12px 24px',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Log In
        </Link>
      </div>
    </div>
  )
}

export default Landing