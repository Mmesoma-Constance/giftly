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

import GenerateGift from './external pages/GenerateGift';
// import ResultsPage from './external pages/ResultsPage';
import GiftResult from './external pages/GiftResult';

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

        {/* Generate Gift Page */}
        <Route path="/generate-gift" element={<GenerateGift />} />

        {/* Results Page */}
        <Route path="/result" element={<GiftResult />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App