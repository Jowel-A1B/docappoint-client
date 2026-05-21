import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaTimes } from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const inputClass = "w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
const readonlyClass = "w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 cursor-not-allowed"

// BookingModal: handles form state and submits appointment to server.
// Uses `withCredentials: true` to send auth cookies; do not remove.
const BookingModal = ({ doctor, onClose }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    patientName: user?.name || '',
    gender: '',
    phone: '',
    appointmentDate: '',
    appointmentTime: '',
  })

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post(`${API}/appointments`, {
        ...form,
        userEmail: user.email,
        doctorId: doctor._id,
        doctorName: doctor.name,
        doctorSpecialty: doctor.specialty,
        doctorImage: doctor.image,
        fee: doctor.fee,
      }, { withCredentials: true })
      toast.success('Appointment booked successfully!')
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed!')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Book Appointment</h2>
            <p className="text-sky-500 text-sm font-medium">{doctor.name} — {doctor.specialty}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <FaTimes className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Doctor</label>
            <input value={doctor.name} readOnly className={readonlyClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Email</label>
            <input value={user?.email} readOnly className={readonlyClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Patient Name <span className="text-red-500">*</span></label>
            <input name="patientName" value={form.patientName} onChange={handleChange} required placeholder="Enter patient name" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender <span className="text-red-500">*</span></label>
            <select name="gender" value={form.gender} onChange={handleChange} required className={inputClass}>
              <option value="">Select gender</option>
              <option>Male</option><option>Female</option><option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} required placeholder="01XXXXXXXXX" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Appointment Date <span className="text-red-500">*</span></label>
            <input type="date" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time Slot <span className="text-red-500">*</span></label>
            <select name="appointmentTime" value={form.appointmentTime} onChange={handleChange} required className={inputClass}>
              <option value="">Select time slot</option>
              {doctor.availability?.map((slot, i) => <option key={i} value={slot}>{slot}</option>)}
            </select>
          </div>
          <div className="bg-sky-50 dark:bg-sky-900/30 rounded-xl p-3 flex justify-between items-center">
            <span className="text-gray-600 dark:text-gray-300 text-sm">Consultation Fee:</span>
            <span className="text-sky-600 dark:text-sky-400 font-bold text-lg">৳{doctor.fee}</span>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-60">
            {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default BookingModal