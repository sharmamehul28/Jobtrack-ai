import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

const FILTER_OPTIONS = ['All', 'Applied', 'Assessment', 'Interview', 'Rejected', 'Offer']

function ApplicationsList({ applications, resumeVersions, onDelete }) {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All' ? applications : applications.filter((app) => app.status === filter)

  function getResumeVersionName(id) {
    if (!id) return null
    const match = resumeVersions.find((v) => v.id === id)
    return match ? match.name : null
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(opt)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: '1px solid #d1d5db',
              background: filter === opt ? '#1e2761' : 'white',
              color: filter === opt ? 'white' : '#374151',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            {opt}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          {applications.length === 0
            ? 'No applications yet — add your first one!'
            : 'No applications match this filter.'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((app) => {
            const resumeName = getResumeVersionName(app.resume_version_id)
            return (
              <div
                key={app.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px' }}>
                    {app.company_name} — {app.job_title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                    Applied: {app.date_applied}
                    {app.interview_date ? ` • Interview: ${app.interview_date}` : ''}
                    {resumeName ? ` • Resume: ${resumeName}` : ''}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <StatusBadge status={app.status} />
                  <Link
                    to={`/applications/${app.id}/edit`}
                    style={{ fontSize: '13px', padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: '6px', textDecoration: 'none', color: '#374151' }}
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(app.id)}
                    style={{ fontSize: '13px', padding: '6px 12px', border: '1px solid #fca5a5', borderRadius: '6px', background: 'white', color: '#991b1b', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ApplicationsList