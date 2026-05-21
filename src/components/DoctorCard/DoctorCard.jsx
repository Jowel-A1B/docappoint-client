import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaStar, FaMapMarkerAlt, FaHospital } from 'react-icons/fa'

const DoctorCard = ({ doctor }) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleViewDetails = () => {
    if (!user) navigate('/login')
    else navigate(`/doctor/${doctor._id}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700">
      <div className="relative overflow-hidden h-52">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${doctor.name}&size=200&background=0ea5e9&color=fff` }}
        />
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">{doctor.rating}</span>
        </div>
      </div>
      <div className="p-5">
        <span className="text-xs font-semibold text-sky-500 bg-sky-50 dark:bg-sky-900/30 px-3 py-1 rounded-full">{doctor.specialty}</span>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-2 mb-1">{doctor.name}</h3>
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mb-1">
          <FaHospital className="text-sky-400 text-xs flex-shrink-0" />
          <span className="truncate">{doctor.hospital}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <FaMapMarkerAlt className="text-sky-400 text-xs flex-shrink-0" />
          <span className="truncate">{doctor.location}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-sky-600 dark:text-sky-400 font-bold text-lg">৳{doctor.fee}</span>
          <button
            onClick={handleViewDetails}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2 rounded-lg transition-all text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default DoctorCard