function ConversionRates({ interviewConversionRate, offerConversionRate }) {
  const barStyle = (pct, color) => ({
    height: '10px',
    borderRadius: '9999px',
    background: '#e5e7eb',
    overflow: 'hidden',
    marginTop: '6px',
    marginBottom: '18px',
  })
  const fillStyle = (pct, color) => ({
    height: '100%',
    width: `${pct}%`,
    background: color,
    borderRadius: '9999px',
  })

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', flex: 1, minWidth: '280px' }}>
      <h3 style={{ fontSize: '14px', margin: '0 0 12px 0' }}>Conversion Rates</h3>

      <div style={{ fontSize: '13px', color: '#374151' }}>
        Interview Rate: <strong>{interviewConversionRate}%</strong>
      </div>
      <div style={barStyle()}>
        <div style={fillStyle(interviewConversionRate, '#6366f1')} />
      </div>

      <div style={{ fontSize: '13px', color: '#374151' }}>
        Offer Rate: <strong>{offerConversionRate}%</strong>
      </div>
      <div style={barStyle()}>
        <div style={fillStyle(offerConversionRate, '#10b981')} />
      </div>
    </div>
  )
}

export default ConversionRates