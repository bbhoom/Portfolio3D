//rafce
import React from 'react'
import Navbar from './sections/Navbar.jsx'
import Hero from './sections/Hero.jsx'
import About from './sections/About.jsx'
import Projects from './sections/Projects.jsx'
import Contact from './sections/Contact.jsx'
import Achievements from './sections/Achievements.jsx'
import Footer from './sections/Footer.jsx'

const App = () => {
  return (
    <main className='main-w-7xl mx-auto'>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Contact />
      <Footer />
    </main >
  )
}

export default App