import { Link } from 'react-router-dom'
import { FaStethoscope, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

// Footer: contains branding, quick links and contact info.
// Static presentational component — safe to update styles only.
const Footer = () => (
  <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 pt-14 pb-6">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
      <div className="col-span-1 md:col-span-2">
        <Link to="/" className="flex items-center gap-2 mb-4">
          <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center">
            <FaStethoscope className="text-white text-lg" />
          </div>
          <span className="text-xl font-bold text-white">Doc<span className="text-sky-400">Appoint</span></span>
        </Link>
        <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
          Your trusted platform for booking doctor appointments online. Fast, secure, and convenient healthcare at your fingertips.
        </p>
        <div className="flex gap-3 mt-5">
          {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
            <a key={i} href="#" className="w-9 h-9 rounded-full bg-gray-700 hover:bg-sky-500 flex items-center justify-center transition-colors">
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2.5 text-sm">
          <li><Link to="/" className="hover:text-sky-400 transition-colors">Home</Link></li>
          <li><Link to="/appointments" className="hover:text-sky-400 transition-colors">All Appointment</Link></li>
          <li><Link to="/dashboard" className="hover:text-sky-400 transition-colors">Dashboard</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4">Contact</h4>
        <ul className="space-y-2.5 text-sm text-gray-400">
          <li>📍 Dhaka, Bangladesh</li>
          <li>📞 +880 1700-000000</li>
          <li>✉️ info@docappoint.com</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} DocAppoint. All rights reserved.
    </div>
  </footer>
)

export default Footer