import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getApplications, deleteApplication } from '../lib/applications'
import { getResumeVersions } from '../lib/resumeVersions'
import ApplicationsList from '../components/ApplicationsList'

function Dashboard() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [resumeVersions, setResumeVersions] = useState([])
  const [loadingApps, setLoadingApps] = useState(true)
  const [fetchError, setFetchError] = useState('')

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  async function loadDashboardData() {
    setLoadingApps(true)
    const [appsResult, versionsResult] = await Promise.all([
      getApplications(),
      getResumeVersions(),
    ])

    if (appsResult.error) {
      setFetchError(appsResult.error.message)
    } else {
      setApplications(appsResult.data)
    }

    if (!versionsResult.error) {
      setResumeVersions(versionsResult.data)
    }

    setLoadingApps(false)
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Delete this application? This cannot be undone.')
    if (!confirmed) return

    const { error } = await deleteApplication(id)
    if (error) {
      alert('Error deleting: ' + error.message)
      return
    }
    setApplications((prev) => prev.filter((app) => app.id !== id))
  }

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  if (loading) return <p style={{ padding: '40px' }}>Loading...</p>

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {user && (
            <Link
              to="/resume-versions"
              style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', textDecoration: 'none', color: '#374151', fontSize: '14px' }}
            >
              Resume Versions
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              style={{ padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>
        {user ? `Logged in as: ${user.email}` : 'No user logged in yet'}
      </p>

      {user && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>Your Applications</h2>
            <Link
              to="/applications/new"
              style={{ padding: '8px 16px', background: '#1e2761', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}
            >
              + Add Application
            </Link>
          </div>

          {loadingApps && <p>Loading applications...</p>}
          {fetchError && <p style={{ color: '#991b1b' }}>Error: {fetchError}</p>}
          {!loadingApps && !fetchError && (
            <ApplicationsList
              applications={applications}
              resumeVersions={resumeVersions}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard