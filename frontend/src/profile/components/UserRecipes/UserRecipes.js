import React from "react";
import recipeData from "../../../data/recipeData";
import "./UserRecipes.css";

const UserRecipes = () => {
  const mapResult = recipeData.map((recipe) => {
    return (
      <div key={recipe.id} className="recipe-card">
        <h1>{recipe.title}</h1>
        <h2>{recipe.author}</h2>
        <p>{recipe.description}</p>
        <p>{recipe["date-created"]}</p>
        <img alt="recipe" src={recipe.img} />
        <p className="tags">
          {recipe.tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </p>
      </div>
    );
  });

  return <div className="user-recipes-container">{mapResult}</div>;
};

export default UserRecipes;
