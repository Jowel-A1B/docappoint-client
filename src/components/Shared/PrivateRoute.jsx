import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return children
}

export default PrivateRoute
