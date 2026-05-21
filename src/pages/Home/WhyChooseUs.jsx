const features = [
  { icon: '🏥', title: '50+ Specialists', desc: 'Access to verified doctors across all major medical specialties.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your health data is encrypted and completely confidential.' },
  { icon: '⚡', title: 'Instant Booking', desc: 'Book appointments in under 2 minutes, anytime, anywhere.' },
  { icon: '💬', title: '24/7 Support', desc: 'Our support team is always ready to help with your queries.' },
]

// WhyChooseUs: static features grid used on Home page.
// Keep content concise; this is a purely presentational module.
const WhyChooseUs = () => (
  <section className="py-16 bg-white dark:bg-gray-900">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-10">
        <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Our Advantages</span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2">Why Choose DocAppoint?</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{f.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default WhyChooseUs