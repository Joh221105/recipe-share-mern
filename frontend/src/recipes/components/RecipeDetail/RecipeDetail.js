import React from "react";
import './RecipeDetail.css'

const RecipeDetails = (props) => {
  const {
    title,
    description,
    img,
    tags,
    author,
    dateCreated,
    lastUpdated,
    ingredients,
    directions,
  } = props.recipe;

  return (
    <div>
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>{description}</p>
      <p>Tags: {tags.join(", ")}</p>
      <p>Date Created: {dateCreated}</p>
      <p>Last Updated: {lastUpdated}</p>

      <h3>Ingredients:</h3>
      <ul>
        {Object.keys(ingredients).map((ingredientName, index) => (
          <li key={index}>
            {ingredientName}: {ingredients[ingredientName]}
          </li>
        ))}
      </ul>

      <h3>Directions:</h3>
      <ol>
        {directions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDetails;
