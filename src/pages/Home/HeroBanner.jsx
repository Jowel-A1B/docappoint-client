import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

// HeroBanner: uses Swiper to render promotional slides.
// Images are external; ensure licenses before changing assets.
const slides = [
  {
    title: "Book Your Doctor Appointment Instantly",
    subtitle: "Connect with top-rated doctors in Bangladesh. Fast, secure, and hassle-free.",
    bg: "from-sky-600 to-cyan-500",
    img: "https://img.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg"
  },
  {
    title: "Expert Specialists at Your Fingertips",
    subtitle: "From cardiologists to pediatricians — find the right doctor for you.",
    bg: "from-blue-600 to-sky-500",
    img: "https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21202.jpg"
  },
  {
    title: "Your Health, Our Priority",
    subtitle: "Manage your appointments, view doctor profiles, and get the best care.",
    bg: "from-cyan-600 to-teal-500",
    img: "https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980721.jpg"
  }
]

const HeroBanner = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-[480px] md:h-[560px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={`relative h-full bg-gradient-to-r ${slide.bg} flex items-center`}>
              <div className="absolute inset-0">
                <img src={slide.img} alt="" className="w-full h-full object-cover opacity-20" />
              </div>
              <div className="relative z-10 max-w-7xl mx-auto px-6 text-white">
                <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-sky-100 max-w-xl mb-8">{slide.subtitle}</p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/appointments" className="bg-white text-sky-600 font-bold px-7 py-3 rounded-xl hover:bg-sky-50 transition-all shadow-lg">
                    Book Appointment
                  </Link>
                  <Link to="/appointments" className="border-2 border-white text-white font-bold px-7 py-3 rounded-xl hover:bg-white hover:text-sky-600 transition-all">
                    View Doctors
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default HeroBanner
