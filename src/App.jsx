import './App.css'
import { Routes, Route } from "react-router-dom";

import Blogs from './body/Blogs'
import Collections from './body/Collections'
import CTASection from './body/CTASection'
import HowItWorks from './body/HowItWorks'
import Testimonials from './body/Testimonials'
import Trending from './body/Trending'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

// NEW PAGE
// import Explore from './pages/Explore'; // create this file
import GenerateGift from './external pages/GenerateGift';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Landing Page */}
        <Route path="/" element={
          <>
            <Hero />
            <Collections />
            <HowItWorks />
            <Testimonials />
            <Trending />
            <Blogs />
            <CTASection />
          </>
        } />

        {/* New Page */}
        <Route path="/generate-gift" element={<GenerateGift />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App