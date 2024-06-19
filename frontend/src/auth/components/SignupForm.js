import React from 'react'
import tempImage from '../../images/Placeholder.jpg';
import Navbar from '../../common/components/Navbar'
import Footer from '../../common/components/Footer'


const SignupForm = () => {
  return (
    <div>
      <Navbar />
      <h1>WELCOME TO RECIPE CIRCLE</h1>
      <img width="25%" alt = "Sunflower placeholder" src={tempImage}></img>
      <label>
        Email
        <input type="text"></input>
      </label>
      <label>
        Password
        <input type="text"></input>
      </label>
      <label>
        Confirm Password
        <input type="text"></input>
      </label>
      <button type="submit">Sign up </button>
      <Footer />
    </div>
  )
}

export default SignupForm