import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  getResumeVersions,
  addResumeVersion,
  updateResumeVersion,
  deleteResumeVersion,
} from '../lib/resumeVersions'

function ResumeVersions() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [versions, setVersions] = useState([])
  const [loading, setLoading] = useState(true)
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editingName, setEditingName] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadVersions()
  }, [])

  async function loadVersions() {
    setLoading(true)
    const { data, error } = await getResumeVersions()
    if (error) {
      console.error('Load resume versions failed:', error)
      setError('Could not load your resume versions. Please refresh the page.')
    } else {
      setVersions(data)
    }
    setLoading(false)
  }

  async function handleAdd(e) {
    e.preventDefault()
    setError('')
    if (!newName.trim()) {
      setError('Please enter a name for this resume version.')
      return
    }
    setAdding(true)
    const { error } = await addResumeVersion(newName.trim(), user.id)
    setAdding(false)
    if (error) {
      console.error('Add resume version failed:', error)
      setError('Something went wrong saving this resume version. Please try again.')
      return
    }
    setNewName('')
    loadVersions()
  }

  function startEdit(version) {
    setEditingId(version.id)
    setEditingName(version.name)
  }

  async function handleSaveEdit(id) {
    if (!editingName.trim()) {
      setError('Name cannot be empty.')
      return
    }
    const { error } = await updateResumeVersion(id, editingName.trim())
    if (error) {
      console.error('Update resume version failed:', error)
      setError('Something went wrong saving your changes. Please try again.')
      return
    }
    setEditingId(null)
    setEditingName('')
    loadVersions()
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      'Delete this resume version? Any applications using it will show "None" instead.'
    )
    if (!confirmed) return
    const { error } = await deleteResumeVersion(id)
    if (error) {
      console.error('Delete resume version failed:', error)
      setError('Something went wrong deleting this resume version. Please try again.')
      return
    }
    loadVersions()
  }

  const inputStyle = {
    padding: '8px 12px',
    border: '1px solid var(--border-color)',
    background: 'var(--input-bg)',
    color: 'var(--text-primary)',
    borderRadius: '6px',
    fontSize: '14px',
  }
  const btnPrimary = {
    padding: '8px 16px',
    background: 'var(--accent)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 600,
  }
  const btnSecondary = {
    padding: '6px 12px',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  }
  const btnDanger = {
    padding: '6px 12px',
    background: 'var(--bg-card)',
    color: '#991b1b',
    border: '1px solid #fca5a5',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  }

  return (
    <div className="page-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="header-row" style={{ marginBottom: '24px' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>Resume Versions</h1>
        <button onClick={() => navigate('/dashboard')} style={btnSecondary}>
          ← Back to Dashboard
        </button>
      </div>

      {error && (
        <div role="alert" style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <label htmlFor="new-version-name" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
          Resume version name
        </label>
        <input
          id="new-version-name"
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="e.g. Software Engineer Resume v1"
          style={{ ...inputStyle, flex: 1, minWidth: '200px' }}
        />
        <button type="submit" disabled={adding} style={btnPrimary}>
          {adding ? 'Adding...' : '+ Add Version'}
        </button>
      </form>

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Loading...</p>
      ) : versions.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No resume versions yet — add your first one above.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {versions.map((v) => (
            <div
              key={v.id}
              style={{
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                borderRadius: '8px',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              {editingId === v.id ? (
                <>
                  <label htmlFor={`edit-version-${v.id}`} style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                    Edit resume version name
                  </label>
                  <input
                    id={`edit-version-${v.id}`}
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    style={{ ...inputStyle, flex: 1, minWidth: '160px' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => handleSaveEdit(v.id)} style={btnPrimary}>
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} style={btnSecondary}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{v.name}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => startEdit(v)} style={btnSecondary} aria-label={`Edit ${v.name}`}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(v.id)} style={btnDanger} aria-label={`Delete ${v.name}`}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ResumeVersions