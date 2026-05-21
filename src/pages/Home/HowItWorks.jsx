const steps = [
  { icon: '🔍', title: 'Find a Doctor', desc: 'Search and browse top-rated doctors by specialty or name.' },
  { icon: '📅', title: 'Book Appointment', desc: 'Choose your preferred date, time and book in just a few clicks.' },
  { icon: '✅', title: 'Get Confirmation', desc: 'Receive instant confirmation and manage bookings from dashboard.' },
]

const HowItWorks = () => (
  <section className="bg-sky-50 dark:bg-gray-800 py-16">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Simple Process</span>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all">
            <div className="text-5xl mb-4">{step.icon}</div>
            <div className="w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4">{i + 1}</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{step.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default HowItWorks