import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaGoogle, FaEye, FaEyeSlash, FaStethoscope } from 'react-icons/fa'

// Login page: handles email/password and Google social login.
// On success navigates back to the `from` location preserved in state.
const Login = () => {
  const { login, googleLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed!')
    } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    setGLoading(true)
    try {
      await googleLogin()
      toast.success('Welcome!')
      navigate(from, { replace: true })
    } catch { toast.error('Google login failed!') }
    finally { setGLoading(false) }
  }

  return (
    <>
      <Helmet><title>Login - DocAppoint</title></Helmet>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-7">
            <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FaStethoscope className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Login</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back to DocAppoint</p>
          </div>

          <button onClick={handleGoogle} disabled={gLoading}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-600 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-gray-700 rounded-xl py-3 font-semibold text-gray-700 dark:text-gray-200 transition-all mb-5 disabled:opacity-60"
          >
            <FaGoogle className="text-red-500" />
            {gLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <hr className="flex-1 border-gray-200 dark:border-gray-600" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-200 dark:border-gray-600" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-sky-500 hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 pr-12 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-60 mt-2"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Don't have an account?{' '}
            <Link to="/register" className="text-sky-500 font-semibold hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login