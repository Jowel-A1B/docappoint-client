import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiStar } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../Spinner/Spinner';

const API_URL = import.meta.env.VITE_API_URL;

const ReviewSection = ({ doctorId }) => {
  const { user, token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${API_URL}/reviews/${doctorId}`);
      setReviews(res.data);
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => { fetchReviews(); }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) { toast.error('Please write a comment.'); return; }
    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/reviews`, {
        doctorId,
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
        rating,
        comment,
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Review added successfully!');
      setComment('');
      setRating(5);
      fetchReviews();
    } catch { toast.error('Failed to add review.'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="card p-6 md:p-8 mt-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Patient Reviews</h2>

      {/* Add Review */}
      {user && (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 dark:bg-gray-700/40 p-5 rounded-xl">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-3">Write a Review</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">Rating:</span>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} type="button" onClick={() => setRating(n)}>
                <FiStar size={20} className={n <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            className="input-field resize-none"
            placeholder="Share your experience..."
          />
          <button type="submit" disabled={submitting} className="btn-primary mt-3">
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {loading ? <Spinner small /> : reviews.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-6">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700/40 rounded-xl">
              <img
                src={r.userPhoto || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.userName)}&background=0EA5E9&color=fff`}
                alt={r.userName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800 dark:text-white">{r.userName}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <FiStar key={j} size={13} className={j < r.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{r.comment}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(r.createdAt).toLocaleDateString('en-BD')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
