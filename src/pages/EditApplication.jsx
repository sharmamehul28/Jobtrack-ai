import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { updateApplication } from '../lib/applications'
import ApplicationForm from '../components/ApplicationForm'

function EditApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadApplication()
  }, [id])

  async function loadApplication() {
    setLoading(true)
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      setNotFound(true)
    } else {
      setApplication(data)
    }
    setLoading(false)
  }

  async function handleSubmit(formData) {
    setError('')
    const previousStatus = application.status
    const updatedFields = { ...formData }

    if (formData.status !== previousStatus) {
      updatedFields.status_updated_at = new Date().toISOString()
    }

    const { error: updateError } = await updateApplication(id, updatedFields)
    if (updateError) {
      console.error('Update application failed:', updateError)
      setError('Something went wrong saving your changes. Please try again.')
      return
    }
    navigate('/dashboard')
  }

  if (loading) return <div className="page-container" style={{ color: 'var(--text-secondary)' }}>Loading...</div>
  if (notFound) {
    return (
      <div className="page-container">
        <p style={{ color: 'var(--text-primary)' }}>Application not found, or you don't have access to it.</p>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '8px 16px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="page-container">
      <h1 style={{ color: 'var(--text-primary)' }}>Edit Application</h1>
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px', maxWidth: '500px' }}>
          {error}
        </div>
      )}
      <ApplicationForm
        initialData={application}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/dashboard')}
        submitLabel="Save Changes"
      />
    </div>
  )
}

export default EditApplication