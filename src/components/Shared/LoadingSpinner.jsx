// LoadingSpinner: lightweight spinner used during async loads.
// Pure presentational component — no side effects.
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
)
export default LoadingSpinner
