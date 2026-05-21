import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaGoogle, FaEye, FaEyeSlash, FaStethoscope } from 'react-icons/fa'

// Register page: client-side validation before calling `register`.
// Password policy enforced locally; server performs its own checks too.
const Register = () => {
  const { register, googleLogin } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', photoURL: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const errs = {}
    if (!/[A-Z]/.test(form.password)) errs.password = 'Must include at least one uppercase letter'
    else if (!/[a-z]/.test(form.password)) errs.password = 'Must include at least one lowercase letter'
    else if (form.password.length < 6) errs.password = 'Minimum 6 characters required'
    return errs
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    try {
      await register(form.name, form.email, form.password, form.photoURL)
      toast.success('Registration successful! Please login.')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed!')
    } finally { setLoading(false) }
  }

  const handleGoogle = async () => {
    setGLoading(true)
    try {
      await googleLogin()
      toast.success('Welcome to DocAppoint!')
      navigate('/')
    } catch { toast.error('Google signup failed!') }
    finally { setGLoading(false) }
  }

  return (
    <>
      <Helmet><title>Register - DocAppoint</title></Helmet>
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-7">
            <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <FaStethoscope className="text-white text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Register</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Create your DocAppoint account</p>
          </div>

          <button onClick={handleGoogle} disabled={gLoading}
            className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-600 hover:border-sky-400 hover:bg-sky-50 dark:hover:bg-gray-700 rounded-xl py-3 font-semibold text-gray-700 dark:text-gray-200 transition-all mb-5 disabled:opacity-60"
          >
            <FaGoogle className="text-red-500" />
            {gLoading ? 'Signing up...' : 'Sign up with Google'}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <hr className="flex-1 border-gray-200 dark:border-gray-600" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-200 dark:border-gray-600" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Your full name' },
              { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Photo URL', name: 'photoURL', type: 'text', placeholder: 'https://...', optional: true },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {field.label} {field.optional && <span className="text-gray-400 font-normal">(optional)</span>}
                </label>
                <input
                  type={field.type} name={field.name} value={form[field.name]} onChange={handleChange}
                  required={!field.optional} placeholder={field.placeholder}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange} required
                  placeholder="Min 6 chars, upper & lowercase"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 pr-12 bg-white dark:bg-gray-700 text-gray-800 dark:text-white ${errors.password ? 'border-red-400' : 'border-gray-200 dark:border-gray-600'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all shadow-md disabled:opacity-60 mt-2"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-sky-500 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register