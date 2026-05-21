import { NavLink, Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
import { FaCalendarAlt, FaUser } from 'react-icons/fa'

// Dashboard layout: provides user sidebar and nested routes via <Outlet>.
// Keep route children responsibility to their own modules.
const Dashboard = () => {
  const { user } = useAuth()

  return (
    <>
      <Helmet><title>Dashboard - DocAppoint</title></Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-5 pb-5 border-b border-gray-100 dark:border-gray-700">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.name}&background=0ea5e9&color=fff`}
                    alt={user?.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-2 border-2 border-sky-400"
                  />
                  <p className="font-bold text-gray-800 dark:text-white">{user?.name}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
                <nav className="space-y-1">
                  {[
                    { to: '/dashboard/my-bookings', icon: <FaCalendarAlt />, label: 'My Bookings' },
                    { to: '/dashboard/my-profile', icon: <FaUser />, label: 'My Profile' },
                  ].map(item => (
                    <NavLink key={item.to} to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm
                        ${isActive ? 'bg-sky-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-gray-700 hover:text-sky-600'}`
                      }
                    >
                      {item.icon}{item.label}
                    </NavLink>
                  ))}
                </nav>
              </div>
            </aside>
            <main className="flex-1"><Outlet /></main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard