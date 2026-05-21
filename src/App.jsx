import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import AllAppointments from './pages/AllAppointments'
import DoctorDetails from './pages/DoctorDetails'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import MyBookings from './pages/Dashboard/MyBookings'
import MyProfile from './pages/Dashboard/MyProfile'
import PrivateRoute from './components/Shared/PrivateRoute'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { borderRadius: '12px', fontWeight: '600' },
          success: { style: { background: '#ecfdf5', color: '#065f46', border: '1px solid #6ee7b7' } },
          error: { style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fca5a5' } },
        }}
      />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<AllAppointments />} />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route index element={<MyBookings />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="my-profile" element={<MyProfile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App