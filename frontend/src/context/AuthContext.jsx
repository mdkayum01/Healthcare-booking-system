import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('careconnect-token')
    if (!token) {
      setLoading(false)
      return
    }

    getCurrentUser()
      .then(({ data }) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('careconnect-token')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (payload) => {
    const { data } = await loginUser(payload)
    localStorage.setItem('careconnect-token', data.token)
    setUser(data.user)
    return data
  }

  const register = async (payload) => {
    const { data } = await registerUser(payload)
    localStorage.setItem('careconnect-token', data.token)
    setUser(data.user)
    return data
  }

  const setUserFromToken = (nextUser) => {
    setUser(nextUser)
  }

  const logout = () => {
    localStorage.removeItem('careconnect-token')
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout, setUserFromToken }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
