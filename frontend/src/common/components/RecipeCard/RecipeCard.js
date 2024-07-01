import React from "react";
import "./RecipeCard.css";

const RecipeCard = ({ title, author, tags, description, img }) => {
  return (
    <div className="recipe-card">
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