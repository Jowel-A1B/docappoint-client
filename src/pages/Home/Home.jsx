import { Helmet } from 'react-helmet-async'
import HeroBanner from './HeroBanner'
import TopDoctors from './TopDoctors'
import HowItWorks from './HowItWorks'
import WhyChooseUs from './WhyChooseUs'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>DocAppoint - Book Doctor Appointments Online</title>
        <meta name="description" content="Book appointments with top doctors in Bangladesh. Fast, secure, and convenient online healthcare booking." />
      </Helmet>
      <HeroBanner />
      <TopDoctors />
      <HowItWorks />
      <WhyChooseUs />
    </>
  )
}

export default Home
