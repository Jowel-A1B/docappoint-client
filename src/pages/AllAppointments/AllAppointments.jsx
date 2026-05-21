import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import Spinner from '../../components/Spinner/Spinner';
import { FiSearch } from 'react-icons/fi';

const API_URL = import.meta.env.VITE_API_URL;

const AllAppointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (sort) params.sort = sort;
      const res = await axios.get(`${API_URL}/doctors`, { params });
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [sort]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchDoctors();
  };

  return (
    <>
      <Helmet>
        <title>All Appointments | DocAppoint</title>
        <meta name="description" content="Browse all available doctors and book your appointment on DocAppoint." />
      </Helmet>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary to-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">All Appointments</h1>
          <p className="text-white/80">Find and book available doctors near you</p>
        </div>
      </section>

      <section className="py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search & Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <form onSubmit={handleSearch} className="flex flex-1 gap-2">
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by doctor name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
              <button type="submit" className="btn-primary whitespace-nowrap">Search</button>
            </form>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field md:w-52"
            >
              <option value="">Sort By</option>
              <option value="rating">Highest Rated</option>
              <option value="fee_asc">Fee: Low to High</option>
              <option value="fee_desc">Fee: High to Low</option>
            </select>
          </div>

          {loading ? (
            <Spinner small />
          ) : doctors.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 dark:text-gray-400 text-xl">No doctors found.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{doctors.length} doctor(s) found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map(doctor => (
                  <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default AllAppointments;
