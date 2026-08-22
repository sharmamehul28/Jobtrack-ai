function ConversionRates({ interviewConversionRate, offerConversionRate }) {
  const barStyle = {
    height: '10px',
    borderRadius: '9999px',
    background: 'var(--border-color)',
    overflow: 'hidden',
    marginTop: '6px',
    marginBottom: '18px',
  }
  const fillStyle = (pct, color) => ({
    height: '100%',
    width: `${pct}%`,
    background: color,
    borderRadius: '9999px',
  })

  return (
    <div style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)', borderRadius: '8px', padding: '20px', flex: 1, minWidth: '280px' }}>
      <h3 style={{ fontSize: '14px', margin: '0 0 12px 0', color: 'var(--text-primary)' }}>Conversion Rates</h3>

      <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
        Interview Rate: <strong>{interviewConversionRate}%</strong>
      </div>
      <div style={barStyle}>
        <div style={fillStyle(interviewConversionRate, '#6366f1')} />
      </div>

      <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
        Offer Rate: <strong>{offerConversionRate}%</strong>
      </div>
      <div style={barStyle}>
        <div style={fillStyle(offerConversionRate, '#10b981')} />
      </div>
    </div>
  )
}

export default ConversionRates