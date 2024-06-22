import React from 'react'
import './LandingPage.css'
import About from '../../components/About/About'
import RecipeExample from '../../components/RecipeExample/RecipeExample'
import Navbar from '../../../common/components/Navbar/Navbar'
import Footer from '../../../common/components/Footer/Footer'
import landingImage from '../../../images/landingImage.jpg'

const LandingPage = () => {
  return (
    <div id='landing-page-container'>
        <Navbar/>
        <h1 id="landing-page-heading">Welcome To Recipe Circle</h1>
        <img id="landingImage" alt="temp" src={landingImage}></img>
        <About/>
        <RecipeExample />
        <Footer/>
    </div>
  )
}

export default LandingPage