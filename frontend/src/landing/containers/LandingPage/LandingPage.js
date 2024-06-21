import React from 'react'
import './LandingPage.css'
import About from '../../components/About/About'
import RecipeExample from '../../components/RecipeExample/RecipeExample'
import Navbar from '../../../common/components/Navbar/Navbar'
import Footer from '../../../common/components/Footer/Footer'

const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <img alt="temp"></img>
        <About/>
        <RecipeExample />
        <Footer/>
    </div>
  )
}

export default LandingPage