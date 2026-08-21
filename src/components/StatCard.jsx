function StatCard({ label, value }) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        flex: 1,
        minWidth: '140px',
      }}
    >
      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: '#1e2761' }}>{value}</div>
    </div>
  )
}

export default StatCard