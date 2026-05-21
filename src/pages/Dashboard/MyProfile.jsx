import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaUser, FaEdit, FaTimes } from 'react-icons/fa'

const inputClass = "w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"

const MyProfile = () => {
  const { user, updateProfile } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({ name: user?.name || '', photoURL: user?.photoURL || '' })
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateProfile(form.name, form.photoURL)
      toast.success('Profile updated successfully!')
      setShowModal(false)
    } catch { toast.error('Failed to update profile!') }
    finally { setLoading(false) }
  }

  return (
    <>
      <Helmet><title>My Profile - DocAppoint</title></Helmet>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <FaUser className="text-sky-500" /> My Profile
        </h2>
        <div className="flex flex-col items-center text-center py-8">
          <img
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.name}&size=200&background=0ea5e9&color=fff`}
            alt={user?.name} className="w-28 h-28 rounded-full object-cover border-4 border-sky-200 shadow-md mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
          <span className="mt-2 text-xs bg-sky-50 dark:bg-sky-900/30 text-sky-500 border border-sky-200 dark:border-sky-800 px-3 py-1 rounded-full font-medium">Patient</span>
          <button
            onClick={() => { setForm({ name: user?.name, photoURL: user?.photoURL || '' }); setShowModal(true) }}
            className="mt-6 flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
          >
            <FaEdit /> Update Profile
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm p-7 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Update Profile</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaTimes className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Photo URL</label>
                <input name="photoURL" value={form.photoURL} onChange={handleChange} placeholder="https://your-photo.com/photo.jpg" className={inputClass} />
              </div>
              {form.photoURL && (
                <img src={form.photoURL} alt="Preview" className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-sky-200" onError={e => e.target.style.display='none'} />
              )}
              <button type="submit" disabled={loading} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-60">
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default MyProfile