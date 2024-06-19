import React from 'react'
import Navbar from '../../common/components/Navbar'
import Footer from '../../common/components/Footer'
import TempImage from '../../images/Placeholder.jpg'

const LoginForm = () => {
  return (

    <div>
      <Navbar/>
      <h1>WELCOME BACK</h1>
      <img width ="25%" alt="Temporary sunflower" src ={TempImage}/>
      <label>
        Email
        <input type = "text"></input>
      </label>
      <label>
        Password
        <input type = "text"></input>
      </label>
      <button type="submit">Log in</button>
      <Footer/>
      </div>

  )
}

export default LoginForm