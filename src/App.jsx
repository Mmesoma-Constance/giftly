import './App.css'
import { Routes, Route } from "react-router-dom";

import Blogs       from './body/Blogs'
import Collections from './body/Collections'
import CTASection  from './body/CTASection'
import HowItWorks  from './body/HowItWorks'
import Testimonials from './body/Testimonials'
import Trending    from './body/Trending'
import Footer      from './components/Footer'
import Hero        from './components/Hero'
import Navbar      from './components/Navbar'

import GenerateGift from './external pages/GenerateGift';
import GiftResult   from './external pages/GiftResult';
import SavedGifts   from './external pages/SavedGifts';

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

        {/* Saved Gifts Page */}
        <Route path="/saved-gifts" element={<SavedGifts />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App