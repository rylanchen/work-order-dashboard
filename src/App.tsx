import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { AuthProvider, useAuth } from './context.AuthContext'

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { role } = useAuth()
  if (!role) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="*" element={<div className="p-6">Not Found. <Link to="/" className="text-blue-600">Go Home</Link></div>} />
        </Routes>
      </div>
    </AuthProvider>
  )
}
