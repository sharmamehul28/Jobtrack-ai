import { useAuth } from '../context/AuthContext'

   function Dashboard() {
     const { user, loading } = useAuth()

     if (loading) return <p>Loading...</p>

     return (
       <div>
         <h1>Dashboard Page (placeholder)</h1>
         <p>{user ? `Logged in as: ${user.email}` : 'No user logged in yet'}</p>
       </div>
     )
   }

   export default Dashboard