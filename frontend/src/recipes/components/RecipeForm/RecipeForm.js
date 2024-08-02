import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import tags from "../../../data/tags";
import "./RecipeForm.css";

const RecipeForm = () => {
  const { userId } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", measurement: "" },
  ]);
  const [directions, setDirections] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const fileInputRef = useRef(null);

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", measurement: "" }]);
  };

  const handleDirectionChange = (index, event) => {
    const newDirections = [...directions];
    newDirections[index] = event.target.value;
    setDirections(newDirections);
  };

  const handleAddDirection = () => {
    setDirections([...directions, ""]);
  };

  const handleRemoveDirection = (index) => {
    if (directions.length > 1) {
      const newDirections = directions.filter((_, i) => i !== index);
      setDirections(newDirections);
    }
  };

  const handleTagSelect = (event) => {
    const tag = event.target.value;
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const formElements = event.target.elements;

    formData.append("title", formElements.title.value);
    formData.append("description", formElements.description.value);
    formData.append("author", userId);

    const file = fileInputRef.current.files[0];
    if (file) {
      formData.append("image", file);
    }

    const ingredientsArray = ingredients.map(ingredient => ({
      name: ingredient.name,
      amount: ingredient.amount,
      measurement: ingredient.measurement,
    }));
    formData.append("ingredients", JSON.stringify(ingredientsArray));

    const directionsArray = directions;
    formData.append("directions", JSON.stringify(directionsArray));

    const tagsArray = selectedTags;
    formData.append("tags", JSON.stringify(tagsArray));

    try {
      const response = await fetch("http://localhost:5001/recipe", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Recipe created:", result.recipe);

        await fetch(`http://localhost:5001/user/${userId}/addRecipe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeId: result.recipe._id }),
        });

        console.log("Recipe added to user's created recipes");
      } else {
        console.log("Error creating recipe:", result.message);
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
    }
  };

  return (
    <div className="recipe-form-container">
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input type="text" name="title" required />
        </label>
        <label>
          Description
          <textarea name="description" required />
        </label>
        <label>
          Upload Image
          <input type="file" ref={fileInputRef} />
        </label>

        <div className="ingredient-section">
          <h2>Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
              </label>
              <label>
                Amount
                <input
                  type="text"
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
              </label>
              <label>
                Measurement
                <select
                  name="measurement"
                  value={ingredient.measurement}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                >
                  <option value="">Choose...</option>
                  <option value="Cup">Cup</option>
                  <option value="Tbsp">Tbsp</option>
                  <option value="Tsp">Tsp</option>
                </select>
              </label>
              {index === ingredients.length - 1 && (
                <button type="button" onClick={handleAddIngredient}>
                  Add more ingredients
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="direction-section">
          <h2>Directions</h2>
          {directions.map((direction, index) => (
            <div key={index}>
              <label>
                Step {index + 1}:
                <textarea
                  name="direction"
                  value={direction}
                  onChange={(e) => handleDirectionChange(index, e)}
                  required
                />
              </label>
              <button
                type="button"
                onClick={() => handleRemoveDirection(index)}
                disabled={directions.length === 1}
              >
                Remove Step
              </button>
              {index === directions.length - 1 && (
                <button type="button" onClick={handleAddDirection}>
                  Add Steps
                </button>
              )}
            </div>
          ))}
        </div>

        <div>
          <h2>Tags</h2>
          <div className="selected-tags">
            {selectedTags.map((tag, index) => (
              <span
                key={index}
                onClick={() => handleTagRemove(tag)}
                className="selected-tag"
              >
                {tag} X
              </span>
            ))}
          </div>
          <select name="tags" multiple onChange={handleTagSelect}>
            <option value="">Select tag...</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;