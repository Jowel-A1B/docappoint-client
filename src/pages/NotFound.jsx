import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound = () => (
  <>
    <Helmet><title>404 - Page Not Found | DocAppoint</title></Helmet>
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-black text-sky-200 mb-4 select-none">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  </>
)

export default NotFound
