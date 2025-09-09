import React, { createContext, useContext, useState } from 'react'
import type { Role } from '../types'

type AuthContextValue = {
  role: Role | null
  username: string | null
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null)
  const [role, setRole] = useState<Role | null>(null)

  const login = (name: string) => {
    setUsername(name)
    setRole(name.trim().toLowerCase() === 'admin' ? 'admin' : 'user')
  }
  const logout = () => { setUsername(null); setRole(null) }

  return <AuthContext.Provider value={{ role, username, login, logout }}>{children}</AuthContext.Provider>
}
