import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getApplications, deleteApplication } from '../lib/applications'
import { getResumeVersions } from '../lib/resumeVersions'
import { computeStats } from '../lib/analytics'
import ApplicationsList from '../components/ApplicationsList'
import StatCard from '../components/StatCard'
import StatusChart from '../components/StatusChart'
import ConversionRates from '../components/ConversionRates'
import AssistantPanel from '../components/AssistantPanel'

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
    setFetchError('')
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

  if (loading) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Loading your session...
      </div>
    )
  }

  const stats = computeStats(applications)

  return (
    <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="header-row" style={{ marginBottom: '8px' }}>
        <h1 style={{ margin: 0, color: 'var(--text-primary)' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {user && (
            <Link
              to="/resume-versions"
              style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '14px' }}
            >
              Resume Versions
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              style={{ padding: '8px 16px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-primary)' }}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>
        {user ? `Logged in as: ${user.email}` : 'No user logged in yet'}
      </p>

      {user && loadingApps && (
        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-color)', borderRadius: '8px', marginBottom: '24px' }}>
          Loading your applications...
        </div>
      )}

      {user && fetchError && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid #fca5a5',
            color: '#991b1b',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '14px',
          }}
        >
          <strong>Couldn't load your data.</strong> {fetchError}
          <div style={{ marginTop: '10px' }}>
            <button
              onClick={loadDashboardData}
              style={{ padding: '6px 14px', background: '#991b1b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {user && !loadingApps && !fetchError && (
        <>
          <AssistantPanel applications={applications} />

          <div className="dashboard-row" style={{ marginBottom: '20px' }}>
            <StatCard label="Total Applications" value={stats.totalApplications} />
            <StatCard label="Interviews" value={stats.totalInterviews} />
            <StatCard label="Rejections" value={stats.totalRejections} />
            <StatCard label="Offers" value={stats.totalOffers} />
          </div>

          <div className="dashboard-row" style={{ marginBottom: '28px' }}>
            <StatusChart statusCounts={stats.statusCounts} />
            <ConversionRates
              interviewConversionRate={stats.interviewConversionRate}
              offerConversionRate={stats.offerConversionRate}
            />
          </div>

          <div className="header-row" style={{ marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', margin: 0, color: 'var(--text-primary)' }}>Your Applications</h2>
            <Link
              to="/applications/new"
              style={{ padding: '8px 16px', background: 'var(--accent)', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 }}
            >
              + Add Application
            </Link>
          </div>

          <ApplicationsList
            applications={applications}
            resumeVersions={resumeVersions}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  )
}

export default Dashboard