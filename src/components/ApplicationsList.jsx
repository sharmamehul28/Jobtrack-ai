import { useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'
import { getSuggestedAction } from '../lib/assistant'

const FILTER_OPTIONS = ['All', 'Applied', 'Assessment', 'Interview', 'Rejected', 'Offer']

function ApplicationsList({ applications, onDelete, resumeVersions }) {
  const [filter, setFilter] = useState('All')

  const filtered =
    filter === 'All'
      ? applications
      : applications.filter((app) => app.status === filter)

  function getResumeVersionName(id) {
    if (!id) {
      return null
    }
    const match = resumeVersions.find((v) => v.id === id)
    return match ? match.name : null
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map((opt) => {
          const isActive = filter === opt
          return (
            <button
              key={opt}
              type="button"
              onClick={() => setFilter(opt)}
              aria-pressed={isActive}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                border: '1px solid var(--border-color)',
                background: isActive ? 'var(--accent)' : 'var(--bg-card)',
                color: isActive ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          {applications.length === 0
            ? 'No applications yet — add your first one!'
            : 'No applications match this filter.'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((app) => {
            const resumeName = getResumeVersionName(app.resume_version_id)
            const suggestedAction = getSuggestedAction(app)

            return (
              <div
                key={app.id}
                style={{
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  borderRadius: '8px',
                  padding: '14px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>
                    {app.company_name} — {app.job_title}
                  </div>

                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <span>Applied: {app.date_applied}</span>
                    {app.interview_date && <span> • Interview: {app.interview_date}</span>}
                    {resumeName && <span> • Resume: {resumeName}</span>}
                  </div>

                  {app.job_link && (
                    <div style={{ fontSize: '13px', marginTop: '4px' }}>
                      <a
                        href={app.job_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent)' }}
                      >
                        View listing
                      </a>
                    </div>
                  )}

                  {app.notes && (
                    <div
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-secondary)',
                        marginTop: '6px',
                        background: 'var(--bg-subtle)',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        maxWidth: '500px',
                      }}
                    >
                      {app.notes}
                    </div>
                  )}

                  <div style={{ marginTop: '6px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#4338ca',
                        background: '#eef2ff',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      Next: {suggestedAction}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <StatusBadge status={app.status} />

                  <Link
                    to={`/applications/${app.id}/edit`}
                    style={{
                      fontSize: '13px',
                      padding: '6px 12px',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      color: 'var(--text-primary)',
                    }}
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => onDelete(app.id)}
                    aria-label={`Delete application to ${app.company_name}`}
                    style={{
                      fontSize: '13px',
                      padding: '6px 12px',
                      border: '1px solid #fca5a5',
                      borderRadius: '6px',
                      background: 'var(--bg-card)',
                      color: '#991b1b',
                      cursor: 'pointer',
                    }}
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