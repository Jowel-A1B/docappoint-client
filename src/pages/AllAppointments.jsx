import { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'
import DoctorCard from '../components/Shared/DoctorCard'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { FaSearch } from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const AllAppointments = () => {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  const fetchDoctors = (q = '') => {
    setLoading(true)
    axios.get(`${API}/doctors${q ? `?search=${q}` : ''}`)
      .then(res => setDoctors(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchDoctors() }, [])

  const handleSearch = (e) => { e.preventDefault(); fetchDoctors(search) }

  const sorted = [...doctors].sort((a, b) => {
    if (sort === 'fee-asc') return a.fee - b.fee
    if (sort === 'fee-desc') return b.fee - a.fee
    if (sort === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <>
      <Helmet><title>All Doctors - DocAppoint</title></Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">All Available Doctors</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Find and book appointments with our verified specialists</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text" placeholder="Search by doctor name..." value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
                />
              </div>
              <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-xl transition-all">Search</button>
            </form>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
            >
              <option value="default">Sort: Default</option>
              <option value="rating">Sort: Top Rated</option>
              <option value="fee-asc">Sort: Fee (Low to High)</option>
              <option value="fee-desc">Sort: Fee (High to Low)</option>
            </select>
          </div>
          {loading ? <LoadingSpinner /> : sorted.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg">No doctors found for "{search}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map(doctor => <DoctorCard key={doctor._id} doctor={doctor} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AllAppointments