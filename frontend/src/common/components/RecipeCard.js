import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipeId, title, author, tags, description, img }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div
      className="bg-background p-5 shadow-lg border border-secondary mb-5 rounded-lg flex transition-transform duration-200 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0">
        <img
          src={img}
          alt={title}
          className="w-60 h-48 object-cover rounded-t-lg" // fixed image size
        />
      </div>
      <div className="recipe-details p-3 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
        <p className="text-accent italic mb-1">By {author}</p>
        <p className="text-text mb-2">
          <strong>Tags:</strong> {tags.join(", ")}
        </p>
        <p className="text-text">{description}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
