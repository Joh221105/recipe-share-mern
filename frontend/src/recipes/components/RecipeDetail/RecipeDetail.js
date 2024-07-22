import React from "react";
import "./RecipeDetail.css";

const RecipeDetail = ({ recipe }) => {
  const {
    title,
    description,
    img,
    tags,
    author,
    createdAt,
    updatedAt,
    ingredients,
    directions,
  } = recipe;

  return (
    <div className="recipe-details-container">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>{description}</p>
      <p>Tags: {tags.join(", ")}</p>
      <p>Date Created: {new Date(createdAt).toLocaleDateString()}</p>
      <p>Last Updated: {new Date(updatedAt).toLocaleDateString()}</p>

      <h3>Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.amount} {ingredient.measurement}
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

export default RecipeDetail;