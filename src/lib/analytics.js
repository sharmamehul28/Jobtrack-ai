export function computeStats(applications) {
  const total = applications.length
  const statusCounts = { Applied: 0, Assessment: 0, Interview: 0, Rejected: 0, Offer: 0 }

  applications.forEach((app) => {
    if (statusCounts.hasOwnProperty(app.status)) {
      statusCounts[app.status]++
    }
  })

  const totalInterviews = statusCounts.Interview
  const totalRejections = statusCounts.Rejected
  const totalOffers = statusCounts.Offer

  const interviewConversionRate = total > 0 ? Math.round((totalInterviews / total) * 100) : 0
  const offerConversionRate = total > 0 ? Math.round((totalOffers / total) * 100) : 0

  return {
    totalApplications: total,
    totalInterviews,
    totalRejections,
    totalOffers,
    statusCounts,
    interviewConversionRate,
    offerConversionRate,
  }
}