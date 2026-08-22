import { useEffect, useState } from 'react'
import { getResumeVersions } from '../lib/resumeVersions'

const STATUS_OPTIONS = ['Applied', 'Assessment', 'Interview', 'Rejected', 'Offer']

function ApplicationForm({ initialData, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [formData, setFormData] = useState({
    company_name: initialData?.company_name || '',
    job_title: initialData?.job_title || '',
    status: initialData?.status || 'Applied',
    date_applied: initialData?.date_applied || '',
    job_link: initialData?.job_link || '',
    resume_version_id: initialData?.resume_version_id || '',
    interview_date: initialData?.interview_date || '',
    notes: initialData?.notes || '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resumeVersions, setResumeVersions] = useState([])
  const [loadingVersions, setLoadingVersions] = useState(true)

  useEffect(() => {
    loadVersions()
  }, [])

  async function loadVersions() {
    setLoadingVersions(true)
    const { data, error } = await getResumeVersions()
    if (!error) {
      setResumeVersions(data)
    }
    setLoadingVersions(false)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!formData.company_name.trim() || !formData.job_title.trim() || !formData.date_applied) {
      setError('Please fill in Company Name, Job Title, and Date Applied.')
      return
    }

    setSubmitting(true)
    const cleanData = {
      ...formData,
      job_link: formData.job_link.trim() || null,
      resume_version_id: formData.resume_version_id || null,
      interview_date: formData.interview_date || null,
      notes: formData.notes.trim() || null,
    }
    await onSubmit(cleanData)
    setSubmitting(false)
  }

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    border: '1px solid var(--border-color)',
    background: 'var(--input-bg)',
    color: 'var(--text-primary)',
    borderRadius: '6px',
    fontSize: '14px',
    marginTop: '4px',
    marginBottom: '16px',
    boxSizing: 'border-box',
  }
  const labelStyle = { fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <label style={labelStyle}>Company Name *</label>
      <input style={inputStyle} type="text" name="company_name" value={formData.company_name} onChange={handleChange} />

      <label style={labelStyle}>Job Title *</label>
      <input style={inputStyle} type="text" name="job_title" value={formData.job_title} onChange={handleChange} />

      <label style={labelStyle}>Status</label>
      <select style={inputStyle} name="status" value={formData.status} onChange={handleChange}>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <label style={labelStyle}>Date Applied *</label>
      <input style={inputStyle} type="date" name="date_applied" value={formData.date_applied} onChange={handleChange} />

      <label style={labelStyle}>Job Link</label>
      <input style={inputStyle} type="text" name="job_link" value={formData.job_link} onChange={handleChange} placeholder="https://..." />

      <label style={labelStyle}>Resume Version</label>
      <select
        style={inputStyle}
        name="resume_version_id"
        value={formData.resume_version_id}
        onChange={handleChange}
        disabled={loadingVersions}
      >
        <option value="">None</option>
        {resumeVersions.map((v) => (
          <option key={v.id} value={v.id}>{v.name}</option>
        ))}
      </select>

      <label style={labelStyle}>Interview Date (optional)</label>
      <input style={inputStyle} type="date" name="interview_date" value={formData.interview_date} onChange={handleChange} />

      <label style={labelStyle}>Notes</label>
      <textarea style={{ ...inputStyle, minHeight: '80px' }} name="notes" value={formData.notes} onChange={handleChange} />

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button type="submit" disabled={submitting} style={{ padding: '10px 20px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
          {submitting ? 'Saving...' : submitLabel}
        </button>
        <button type="button" onClick={onCancel} style={{ padding: '10px 20px', background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm