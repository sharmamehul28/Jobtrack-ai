const STATUS_COLORS = {
  Applied: { bg: '#dbeafe', text: '#1e40af' },
  Assessment: { bg: '#fef3c7', text: '#92400e' },
  Interview: { bg: '#e0e7ff', text: '#3730a3' },
  Rejected: { bg: '#fee2e2', text: '#991b1b' },
  Offer: { bg: '#d1fae5', text: '#065f46' },
}

function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || { bg: '#e5e7eb', text: '#374151' }
  return (
    <span
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        padding: '4px 10px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 600,
        display: 'inline-block',
      }}
    >
      {status}
    </span>
  )
}

export default StatusBadge