function StatCard({ label, value }) {
  return (
    <div
      style={{
        border: '1px solid var(--border-color)',
        background: 'var(--bg-card)',
        borderRadius: '8px',
        padding: '16px',
        flex: 1,
        minWidth: '140px',
      }}
    >
      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--accent)' }}>{value}</div>
    </div>
  )
}

export default StatCard