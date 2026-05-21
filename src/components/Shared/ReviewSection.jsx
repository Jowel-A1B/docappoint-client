import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { FaStar } from 'react-icons/fa'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const ReviewSection = ({ doctorId }) => {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [hover, setHover] = useState(0)

  useEffect(() => {
    axios.get(`${API}/reviews/${doctorId}`).then(res => setReviews(res.data))
  }, [doctorId])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!user) { toast.error('Please login to add a review'); return }
    setLoading(true)
    try {
      const res = await axios.post(`${API}/reviews`, {
        doctorId, rating, comment,
        userName: user.name,
        userPhoto: user.photoURL,
      }, { withCredentials: true })
      setReviews([res.data, ...reviews])
      setComment(''); setRating(5)
      toast.success('Review submitted!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review')
    } finally { setLoading(false) }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 border border-gray-100 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Patient Reviews</h2>
      {user && (
        <form onSubmit={handleSubmit} className="mb-8 bg-sky-50 dark:bg-sky-900/20 rounded-xl p-5 border border-sky-100 dark:border-sky-900/40">
          <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Add Your Review</h3>
          <div className="flex gap-1 mb-3">
            {[1,2,3,4,5].map(s => (
              <FaStar key={s} size={24}
                className={`cursor-pointer transition-colors ${s <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                onMouseEnter={() => setHover(s)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(s)}
              />
            ))}
          </div>
          <textarea value={comment} onChange={e => setComment(e.target.value)}
            placeholder="Share your experience..." required rows={3}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none mb-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
          <button type="submit" disabled={loading}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-all disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}
      {reviews.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r._id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <img src={r.userPhoto || `https://ui-avatars.com/api/?name=${r.userName}&background=0ea5e9&color=fff`}
                alt={r.userName} className="w-11 h-11 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-800 dark:text-white">{r.userName}</h4>
                  <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map(s => (
                    <FaStar key={s} size={12} className={s <= r.rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'} />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{r.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewSection