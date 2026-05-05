import React from 'react'
import { useNavigate } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
 


const Login = () => {
  const navigate = useNavigate()
  const { loading, handleLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate('/dashboard')
  };

  if(loading) {
    return (<main><h1>Loading.....</h1></main>)
  }


  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e)=>{setEmail(e.target.value)}}
                    type="email" id="email" name='email' placeholder='Enter email address' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    type="password" id="password" placeholder='Enter password' />
                </div>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Don't have an account? 
              <span 
                onClick={() => navigate('/register')}
                style={{ 
                  color: '#e1034d', 
                  cursor: 'pointer', 
                  marginLeft: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                Register here
              </span>
            </p>
                <button className='button primary-button' disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    </main>
  )
}

export default Login
