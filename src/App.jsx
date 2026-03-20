// import { useState } from 'react'
import './App.css'
import Blogs from './body/Blogs'
import Collections from './body/Collections'
import CTASection from './body/CTASection'
import HowItWorks from './body/HowItWorks'
import Testimonials from './body/Testimonials'
import Trending from './body/Trending'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

function App() {
 
  return (
   <>
  <Navbar />
  <Hero />
 <Collections />
  <HowItWorks />
  <Testimonials />
  <Trending />
  <Blogs />
  <CTASection />
  <Footer />
   </>
  )
}

export default App
