import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page-container" style={{ textAlign: 'center', paddingTop: '80px' }}>
      <h1 style={{ fontSize: '48px', color: 'var(--text-primary)', marginBottom: '8px' }}>404</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
        This page doesn't exist.
      </p>
      <Link
        to="/"
        style={{
          padding: '10px 20px',
          background: 'var(--accent)',
          color: 'white',
          borderRadius: '6px',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound