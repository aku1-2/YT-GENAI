import React from 'react'
import { useNavigate } from 'react-router'
import "../auth.form.scss"
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { loading, handleRegister } = useAuth()
  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    await handleRegister({ username, email, password });
  }
  if(loading){
    return (<main><h1>Loading.....</h1></main>)
  }

  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input 
                    onChange={(e)=>{setUsername(e.target.value)}}
                    type="text" id="username" name='username' placeholder='Enter username' />
                </div>
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
                <button className='button primary-button' disabled={loading}>
                  {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Already have an account? 
              <span 
                onClick={() => navigate('/login')}
                style={{ 
                  color: '#e1034d', 
                  cursor: 'pointer', 
                  marginLeft: '0.5rem',
                  textDecoration: 'none'
                }}
              >
                Login here
              </span>
            </p>
        </div>
    </main>
  )
}

export default Register
