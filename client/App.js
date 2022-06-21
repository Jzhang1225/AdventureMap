import React from 'react'

//import Navbar from './components/Navbar'
import NavbarResponsive from './components/NavbarResponsive';
import Routes from './Routes'
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <NavbarResponsive />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
