const FOLLOW_UP_DAYS = 7
const STUCK_DAYS = 10

function daysSince(dateString) {
  if (!dateString) return null
  const then = new Date(dateString)
  const now = new Date()
  const diffMs = now - then
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

function daysUntil(dateString) {
  if (!dateString) return null
  const target = new Date(dateString)
  const now = new Date()
  const diffMs = target - now
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}

const ACTIVE_STATUSES = ['Applied', 'Assessment', 'Interview']

export function getFollowUpFlags(applications) {
  return applications.filter((app) => {
    if (!ACTIVE_STATUSES.includes(app.status)) return false
    const days = daysSince(app.status_updated_at)
    return days !== null && days >= FOLLOW_UP_DAYS
  })
}

export function getNeedsAttention(applications) {
  return applications.filter((app) => {
    if (app.status === 'Rejected' || app.status === 'Offer') return false
    const days = daysSince(app.status_updated_at)
    return days !== null && days >= STUCK_DAYS
  })
}

export function getSuggestedAction(application) {
  const { status, interview_date, status_updated_at } = application
  const followUpDays = daysSince(status_updated_at)

  switch (status) {
    case 'Applied':
      return followUpDays >= FOLLOW_UP_DAYS ? 'Follow Up' : 'Awaiting Response'
    case 'Assessment':
      return followUpDays >= FOLLOW_UP_DAYS ? 'Follow Up' : 'Complete Assessment'
    case 'Interview': {
      if (interview_date) {
        const until = daysUntil(interview_date)
        if (until !== null && until >= 0) return 'Prepare for Interview'
        return 'Send Thank You Email'
      }
      return followUpDays >= FOLLOW_UP_DAYS ? 'Follow Up' : 'Awaiting Interview Details'
    }
    case 'Offer':
      return 'Respond to Offer'
    case 'Rejected':
      return 'Reflect & Apply Elsewhere'
    default:
      return 'Review Application'
  }
}

const PREP_TIPS = [
  'Research the company\'s recent news and product launches.',
  'Review the job description and prepare examples matching each requirement.',
  'Prepare 2-3 thoughtful questions to ask the interviewer.',
  'Practice explaining your resume experience out loud, concisely.',
  'Test your tech setup in advance if the interview is virtual.',
]

export function getInterviewPrepTips(application) {
  if (!application.interview_date) return []
  const until = daysUntil(application.interview_date)
  if (until === null || until < 0) return []
  return PREP_TIPS
}

export function getWeeklySummary(applications) {
  const now = new Date()
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(now.getDate() - 7)

  function isWithinLastWeek(dateString) {
    if (!dateString) return false
    const d = new Date(dateString)
    return d >= sevenDaysAgo && d <= now
  }

  const applicationsThisWeek = applications.filter((app) =>
    isWithinLastWeek(app.date_applied)
  ).length

  const interviewsThisWeek = applications.filter((app) =>
    isWithinLastWeek(app.interview_date)
  ).length

  const followUpsNeeded = getFollowUpFlags(applications).length
  const offersTotal = applications.filter((app) => app.status === 'Offer').length

  let recommendedFocus = 'Keep up the momentum!'
  if (applicationsThisWeek === 0) {
    recommendedFocus = 'Submit a few new applications to keep your pipeline active.'
  } else if (followUpsNeeded > 0) {
    recommendedFocus = `Follow up on ${followUpsNeeded} application${followUpsNeeded > 1 ? 's' : ''} that ${followUpsNeeded > 1 ? 'have' : 'has'} gone quiet.`
  } else if (interviewsThisWeek > 0) {
    recommendedFocus = 'Prepare well for your upcoming interview(s).'
  }

  return {
    applicationsThisWeek,
    interviewsThisWeek,
    followUpsNeeded,
    offersTotal,
    recommendedFocus,
  }
}