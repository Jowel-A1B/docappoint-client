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
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Doctor Info Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-72 h-72 md:h-auto">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&size=300&background=0ea5e9&color=fff` }}
              />
            </div>
            <div className="p-8 flex-1">
              <span className="text-sky-500 font-semibold text-sm bg-sky-50 px-3 py-1 rounded-full">{doctor.specialty}</span>
              <h1 className="text-3xl font-bold text-gray-800 mt-3 mb-2">{doctor.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4,5].map(s => (
                  <FaStar key={s} className={s <= Math.round(doctor.rating) ? 'text-yellow-400' : 'text-gray-200'} />
                ))}
                <span className="text-gray-500 text-sm ml-1">({doctor.rating})</span>
              </div>
              <p className="text-gray-600 mb-5 leading-relaxed">{doctor.description}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600"><FaHospital className="text-sky-400" />{doctor.hospital}</div>
                <div className="flex items-center gap-2 text-gray-600"><FaMapMarkerAlt className="text-sky-400" />{doctor.location}</div>
                <div className="flex items-center gap-2 text-gray-600"><FaClock className="text-sky-400" />{doctor.experience} experience</div>
                <div className="flex items-center gap-2 text-gray-600"><FaMoneyBillWave className="text-sky-400" />Consultation: ৳{doctor.fee}</div>
              </div>
            </div>
          </div>
          {/* Availability */}
          <div className="px-8 pb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Available Times</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {doctor.availability?.map((slot, i) => (
                <span key={i} className="bg-sky-50 text-sky-600 border border-sky-200 px-4 py-1.5 rounded-full text-sm font-medium">
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

        {/* Review Section */}
        <ReviewSection doctorId={id} />
      </div>

      {showModal && (
        <BookingModal doctor={doctor} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

export default DoctorDetails
