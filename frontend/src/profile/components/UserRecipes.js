import React from "react";
import recipeData from "../../recipeData";

const UserRecipes = () => {
  const mapResult = recipeData.map((recipe) => {
    return (
      <div key={recipe.id}>
        <h1>{recipe.title}</h1>
        <h2>{recipe.author}</h2>
        <p>{recipe.description}</p>
        <p>{recipe["date-created"]}</p>
        <img src={recipe.img} />
        {/* <p>{recipe.ingredients}</p> */}
        <p>{recipe.tags}</p>
      </div>
    );
  });

  return <div>{mapResult}</div>;
};

export default UserRecipes;
