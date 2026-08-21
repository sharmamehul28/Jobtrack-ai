import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = {
  Applied: '#3b82f6',
  Assessment: '#f59e0b',
  Interview: '#6366f1',
  Rejected: '#ef4444',
  Offer: '#10b981',
}

function StatusChart({ statusCounts }) {
  const data = Object.entries(statusCounts)
    .filter(([, count]) => count > 0)
    .map(([status, count]) => ({ name: status, value: count }))

  if (data.length === 0) {
    return (
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', flex: 1, minWidth: '280px' }}>
        <h3 style={{ fontSize: '14px', margin: '0 0 12px 0' }}>Status Breakdown</h3>
        <p style={{ color: '#6b7280', fontSize: '13px' }}>No data yet — add an application to see this chart.</p>
      </div>
    )
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '20px', flex: 1, minWidth: '280px' }}>
      <h3 style={{ fontSize: '14px', margin: '0 0 12px 0' }}>Status Breakdown</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || '#9ca3af'} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default StatusChart