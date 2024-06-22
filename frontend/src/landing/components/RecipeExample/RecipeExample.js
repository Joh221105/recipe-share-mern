import React from 'react'
import './RecipeExample.css'
import Carousel from '../../../common/components/Carousel/Carousel'

const RecipeExample = () => {
  return (
    <div id='recipe-example-container'>
      <h2 id="recipe-example-heading">Try These Today!</h2>
      <Carousel />
    </div>
  )
}

export default RecipeExample