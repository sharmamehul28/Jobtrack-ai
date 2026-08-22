import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApplicationForm from '../components/ApplicationForm'
import { addApplication } from '../lib/applications'
import { useAuth } from '../context/AuthContext'

function AddApplication() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [error, setError] = useState('')

  async function handleSubmit(formData) {
    setError('')
    if (!user) {
      setError('You must be logged in to add an application.')
      return
    }
    const { error: submitError } = await addApplication({ ...formData, user_id: user.id })
    if (submitError) {
      console.error('Add application failed:', submitError)
      setError('Something went wrong saving your application. Please try again.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="page-container">
      <h1 style={{ color: 'var(--text-primary)' }}>Add Application</h1>
      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '13px', maxWidth: '500px' }}>
          {error}
        </div>
      )}
      <ApplicationForm onSubmit={handleSubmit} onCancel={() => navigate('/dashboard')} submitLabel="Save" />
    </div>
  )
}

export default AddApplication