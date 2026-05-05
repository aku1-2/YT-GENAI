import React from 'react'
import { useAuth } from '../auth/hooks/useAuth'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const { user, handleLogout } = useAuth()
  const navigate = useNavigate()

  const handleLogoutClick = async () => {
    const success = await handleLogout()
    if (success) {
      navigate('/login')
    }
  }

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'column',
      gap: '2rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to Dashboard! 🎉</h1>
        {user && (
          <div>
            <p>Hello, <strong>{user.username}</strong></p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>
      <button 
        className='button primary-button'
        onClick={handleLogoutClick}
        style={{ padding: '0.75rem 1.5rem' }}
      >
        Logout
      </button>
    </main>
  )
}

export default Dashboard
