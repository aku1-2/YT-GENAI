import {useContext,useEffect} from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";
import { useNavigate } from "react-router";

export const useAuth = () => {
   const navigate = useNavigate()
   const context = useContext(AuthContext) 
   const { user, setUser, loading, setLoading } = context
   

    const handleLogin = async ({ email, password }) => {
    setLoading(true)
    try {
      const data = await login({ email, password })
      setUser(data.user)
      setLoading(false)
      navigate('/dashboard')
      return true
    } catch (err) {
      console.log(err)
      setLoading(false)
      return false
    }
    }
    const handleRegister = async ({ username, email, password }) => {
    setLoading(true)
    try {
      const data = await register({ username, email, password })
      setUser(data.user)
      setLoading(false)
      navigate('/dashboard')
      return true
    } catch (err) {
      console.log(err)
      setLoading(false)
      return false
    }
}
const handleLogout = async () => {
    setLoading(true)
    try {
      await logout()
      setUser(null)
      setLoading(false)
      navigate('/login')
      return true
    } catch (err) {
      console.log(err)
      setLoading(false)
      return false
    }  
  }

   useEffect(()=>{
          const getAndSetUser = async()=>{
              try{
                  const data = await getMe()
                  setUser(data.user)
              }catch(err){
                  console.log(err)
                  setUser(null)
              }finally{
                  setLoading(false)
              }
          }
          getAndSetUser()
      },[])
  return {user, loading , handleLogin, handleRegister, handleLogout}
}