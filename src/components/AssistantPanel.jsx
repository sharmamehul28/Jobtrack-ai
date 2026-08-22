import {
  getFollowUpFlags,
  getNeedsAttention,
  getWeeklySummary,
  getInterviewPrepTips,
} from '../lib/assistant'

function AssistantPanel({ applications }) {
  const followUps = getFollowUpFlags(applications)
  const needsAttention = getNeedsAttention(applications)
  const summary = getWeeklySummary(applications)

  const upcomingInterviews = applications.filter(
    (app) => app.interview_date && getInterviewPrepTips(app).length > 0
  )

  if (applications.length === 0) {
    return null
  }

  return (
    <div
      style={{
        border: '1px solid var(--border-color)',
        background: 'var(--bg-highlight)',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '24px',
      }}
    >
      <h2 style={{ fontSize: '15px', margin: '0 0 6px 0', color: 'var(--accent)' }}>
        Smart Career Assistant — This Week
      </h2>
      <p style={{ fontSize: '13px', color: 'var(--text-primary)', margin: '0 0 16px 0' }}>
        {summary.applicationsThisWeek} application{summary.applicationsThisWeek !== 1 ? 's' : ''} submitted
        {' • '}
        {summary.interviewsThisWeek} interview{summary.interviewsThisWeek !== 1 ? 's' : ''} scheduled
        {' • '}
        {summary.followUpsNeeded} need{summary.followUpsNeeded === 1 ? 's' : ''} follow-up
        {' • '}
        <strong>{summary.recommendedFocus}</strong>
      </p>

      {(followUps.length > 0 || needsAttention.length > 0) && (
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: upcomingInterviews.length > 0 ? '16px' : 0 }}>
          {followUps.map((app) => (
            <span
              key={`followup-${app.id}`}
              style={{
                background: '#fef3c7',
                color: '#92400e',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Follow up: {app.company_name}
            </span>
          ))}
          {needsAttention.map((app) => (
            <span
              key={`attention-${app.id}`}
              style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 600,
              }}
            >
              Needs attention: {app.company_name}
            </span>
          ))}
        </div>
      )}

      {upcomingInterviews.length > 0 && (
        <div>
          {upcomingInterviews.map((app) => (
            <div
              key={`prep-${app.id}`}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '8px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px', color: 'var(--text-primary)' }}>
                Upcoming Interview: {app.company_name} ({app.interview_date})
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                {getInterviewPrepTips(app).map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AssistantPanel