import { useNavigate } from 'react-router-dom'
import ApplicationForm from '../components/ApplicationForm'
import { addApplication } from '../lib/applications'
import { useAuth } from '../context/AuthContext'

function AddApplication() {
  const navigate = useNavigate()
  const { user } = useAuth()

  async function handleSubmit(formData) {
    if (!user) {
      alert('You must be logged in to add an application.')
      return
    }
    const { error } = await addApplication({ ...formData, user_id: user.id })
    if (error) {
      alert('Error saving application: ' + error.message)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Add Application</h1>
      <ApplicationForm onSubmit={handleSubmit} onCancel={() => navigate('/dashboard')} submitLabel="Save" />
    </div>
  )
}

export default AddApplication