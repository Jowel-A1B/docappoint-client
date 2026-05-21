import { useEffect, useState } from 'react'
import axios from 'axios'
import DoctorCard from '../../components/Shared/DoctorCard'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import { Link } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/doctors/top-rated`)
      .then(res => setDoctors(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Our Specialists</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2">Top Rated Doctors</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto">Meet our highly rated specialists trusted by thousands of patients.</p>
        </div>
        {loading ? <LoadingSpinner /> : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctors.map(doctor => <DoctorCard key={doctor._id} doctor={doctor} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/appointments" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md inline-block">
                View All Doctors
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default TopDoctors