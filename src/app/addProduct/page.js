import React from 'react'
import Dashboard from '../components/addProduct/Dashboard'
import NavBar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

function page() {
  return (
    <div>
    <NavBar/>
    <Dashboard/>
    <Footer/>
    </div>
  )
}

export default page