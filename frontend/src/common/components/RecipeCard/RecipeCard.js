import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

const RecipeCard = ({ recipeId, title, author, tags, description, img }) => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipeId}`);
  }

  return (
    <div className="recipe-card" onClick={handleCardClick}>
      <div className="recipe-image">
        <img src={img} alt={title} />
      </div>
      <div className="recipe-details">
        <h3 className="recipe-name">{title}</h3>
        <p className="recipe-author">By {author}</p>
        <p className="recipe-tags"><strong>Tags:</strong> {tags.join(", ")}</p>
        <p className="recipe-description">{description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;