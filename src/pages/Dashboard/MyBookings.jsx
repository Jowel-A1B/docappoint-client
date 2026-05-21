import { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash, FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import UpdateBookingModal from './UpdateBookingModal'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const statusStyle = {
  pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  confirmed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
}

const MyBookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const fetchBookings = () => {
    setLoading(true)
    axios.get(`${API}/appointments/my-appointments`, { withCredentials: true })
      .then(res => setBookings(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchBookings() }, [])

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await axios.delete(`${API}/appointments/${deleteTarget._id}`, { withCredentials: true })
      setBookings(prev => prev.filter(b => b._id !== deleteTarget._id))
      toast.success('Appointment deleted successfully!')
      setDeleteTarget(null)
    } catch { toast.error('Failed to delete!') }
    finally { setDeleteLoading(false) }
  }

  const handleUpdated = (updated) => {
    setBookings(prev => prev.map(b => b._id === updated._id ? updated : b))
    setSelected(null)
    toast.success('Appointment updated successfully!')
  }

  return (
    <>
      <Helmet><title>My Bookings - DocAppoint</title></Helmet>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <FaCalendarAlt className="text-sky-500" /> My Bookings
        </h2>
        {loading ? <LoadingSpinner /> : bookings.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-3">📅</p>
            <p className="text-lg font-medium">No appointments yet</p>
            <p className="text-sm">Book your first appointment with a doctor!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b._id} className="border border-gray-100 dark:border-gray-700 rounded-xl p-5 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={b.doctorImage || `https://ui-avatars.com/api/?name=${b.doctorName}&background=0ea5e9&color=fff`}
                      alt={b.doctorName} className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{b.doctorName}</h3>
                      <p className="text-sky-500 text-sm">{b.doctorSpecialty}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">Patient: {b.patientName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-1.5">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyle[b.status] || statusStyle.pending}`}>
                      {b.status?.charAt(0).toUpperCase() + b.status?.slice(1)}
                    </span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">📅 {b.appointmentDate}</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">🕐 {b.appointmentTime}</p>
                    <p className="text-sky-600 dark:text-sky-400 font-bold text-sm">৳{b.fee}</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button onClick={() => setSelected(b)}
                    className="flex items-center gap-2 bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/30 dark:hover:bg-sky-900/50 text-sky-600 dark:text-sky-400 font-semibold px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    <FaEdit size={13} /> Update
                  </button>
                  <button onClick={() => setDeleteTarget(b)}
                    className="flex items-center gap-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-500 font-semibold px-4 py-2 rounded-lg transition-all text-sm"
                  >
                    <FaTrash size={13} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Delete Confirm Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-7 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Delete Appointment</h3>
              <button onClick={() => setDeleteTarget(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <FiX className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <FaExclamationTriangle className="text-red-500 text-2xl" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Are you sure you want to delete your appointment with <span className="font-semibold text-gray-800 dark:text-white">{deleteTarget.doctorName}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 rounded-xl transition-all disabled:opacity-60"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selected && <UpdateBookingModal booking={selected} onClose={() => setSelected(null)} onUpdated={handleUpdated} />}
    </>
  )
}

export default MyBookings