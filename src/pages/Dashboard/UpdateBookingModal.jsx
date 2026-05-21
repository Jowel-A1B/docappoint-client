import { useState } from 'react'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const inputClass = "w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
const readonlyClass = "w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-400 cursor-not-allowed"

const UpdateBookingModal = ({ booking, onClose, onUpdated }) => {
  const [form, setForm] = useState({
    patientName: booking.patientName,
    gender: booking.gender,
    phone: booking.phone,
    appointmentDate: booking.appointmentDate,
    appointmentTime: booking.appointmentTime,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.put(`${API}/appointments/${booking._id}`, form, { withCredentials: true })
      onUpdated(res.data)
    } catch { } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Update Appointment</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <FaTimes className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Doctor</label>
            <input value={booking.doctorName} readOnly className={readonlyClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input value={booking.userEmail} readOnly className={readonlyClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Patient Name</label>
            <input name="patientName" value={form.patientName} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} required className={inputClass}>
              <option value="">Select gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Appointment Date</label>
            <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Appointment Time</label>
            <input name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required className={inputClass} />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateBookingModal