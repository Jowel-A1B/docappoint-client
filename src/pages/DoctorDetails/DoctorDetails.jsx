import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import BookingModal from '../components/Shared/BookingModal'
import ReviewSection from '../components/Shared/ReviewSection'
import { FaStar, FaMapMarkerAlt, FaHospital, FaClock, FaMoneyBillWave } from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const DoctorDetails = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    axios.get(`${API}/doctors/${id}`)
      .then(res => setDoctor(res.data))
      .catch(() => navigate('/appointments'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <LoadingSpinner />
  if (!doctor) return null

  return (
    <>
      <Helmet>
        <title>{doctor.name} - DocAppoint</title>
        <meta name="description" content={doctor.description} />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden mb-8 border border-gray-100 dark:border-gray-700">
            <div className="md:flex">
              <div className="md:w-72 h-72 md:h-auto flex-shrink-0">
                <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&size=300&background=0ea5e9&color=fff` }}
                />
              </div>
              <div className="p-8 flex-1">
                <span className="text-sky-500 font-semibold text-sm bg-sky-50 dark:bg-sky-900/30 px-3 py-1 rounded-full">{doctor.specialty}</span>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-3 mb-2">{doctor.name}</h1>
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <FaStar key={s} className={s <= Math.round(doctor.rating) ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'} />
                  ))}
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">({doctor.rating})</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">{doctor.description}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><FaHospital className="text-sky-400" />{doctor.hospital}</div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><FaMapMarkerAlt className="text-sky-400" />{doctor.location}</div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><FaClock className="text-sky-400" />{doctor.experience} experience</div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300"><FaMoneyBillWave className="text-sky-400" />Fee: ৳{doctor.fee}</div>
                </div>
              </div>
            </div>
            <div className="px-8 pb-8 border-t border-gray-100 dark:border-gray-700 pt-6">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Available Times</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {doctor.availability?.map((slot, i) => (
                  <span key={i} className="bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 px-4 py-1.5 rounded-full text-sm font-medium">
                    {slot}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  if (!user) { toast.error('Please login first'); navigate('/login'); return; }
                  setShowModal(true)
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md text-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
          <ReviewSection doctorId={id} />
        </div>
      </div>
      {showModal && <BookingModal doctor={doctor} onClose={() => setShowModal(false)} />}
    </>
  )
}

export default DoctorDetails