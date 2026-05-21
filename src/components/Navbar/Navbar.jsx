import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiSun, FiMoon, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import toast from 'react-hot-toast'

// Navbar: renders site navigation, user actions, and theme toggle.
// Keep rendering logic untouched; comment added for maintainers.
const Navbar = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logged out successfully!')
    } catch {
      toast.error('Logout failed. Try again.')
    }
  }

  const linkClass = ({ isActive }) =>
    `font-medium transition-colors hover:text-sky-500 ${isActive ? 'text-sky-500' : 'text-gray-700 dark:text-gray-200'}`

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              Doc<span className="text-sky-500">Appoint</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/appointments" className={linkClass}>All Appointment</NavLink>
            {user && <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=0EA5E9&color=fff`}
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-sky-500"
                  title={user.name}
                />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-semibold text-red-500 border-2 border-red-400 px-4 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                >
                  <FiLogOut size={15} /> Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="text-sm font-semibold text-sky-500 border-2 border-sky-500 px-4 py-1.5 rounded-lg hover:bg-sky-500 hover:text-white transition-all">Login</Link>
                <Link to="/register" className="text-sm font-semibold bg-sky-500 text-white px-4 py-1.5 rounded-lg hover:bg-sky-600 transition-all">Register</Link>
              </div>
            )}

            <button className="md:hidden p-2 text-gray-600 dark:text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 py-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-4">
          <NavLink to="/" className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/appointments" className={linkClass} onClick={() => setMenuOpen(false)}>All Appointment</NavLink>
          {user && <NavLink to="/dashboard" className={linkClass} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>}
          {user ? (
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.name}&background=0EA5E9&color=fff`}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-sky-500"
              />
              <button
                onClick={() => { handleLogout(); setMenuOpen(false) }}
                className="flex items-center gap-2 text-sm font-semibold text-red-500 border-2 border-red-400 px-4 py-1.5 rounded-lg hover:bg-red-500 hover:text-white transition-all"
              >
                <FiLogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <Link to="/login" className="text-center font-semibold text-sky-500 border-2 border-sky-500 py-2 rounded-lg" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="text-center font-semibold bg-sky-500 text-white py-2 rounded-lg" onClick={() => setMenuOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar