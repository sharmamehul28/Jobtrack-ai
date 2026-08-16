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
    const previousStatus = application.status
    const updatedFields = { ...formData }

    // Per API.md: status_updated_at must be refreshed whenever status changes
    if (formData.status !== previousStatus) {
      updatedFields.status_updated_at = new Date().toISOString()
    }

    const { error } = await updateApplication(id, updatedFields)
    if (error) {
      alert('Error updating application: ' + error.message)
      return
    }
    navigate('/dashboard')
  }

  if (loading) return <p style={{ padding: '40px' }}>Loading...</p>
  if (notFound) {
    return (
      <div style={{ padding: '40px' }}>
        <p>Application not found, or you don't have access to it.</p>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Edit Application</h1>
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