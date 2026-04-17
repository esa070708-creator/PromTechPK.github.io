import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Configurator from './components/Configurator'
import WhyUs from './components/WhyUs'
import CaseStudies from './components/CaseStudies'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Configurator />
      <WhyUs />
      <CaseStudies />
      <ContactForm />
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
