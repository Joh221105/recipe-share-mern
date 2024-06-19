import React, { useState } from "react";
import tags from '../../tags'

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([{ name: "", amount: "", measurement: "" }]);
  const [directions, setDirections] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);

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

  const handleTagSelect = (event) => {
    const tag = event.target.value;
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setSelectedTags(prevTags => prevTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //code to be implemented later
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <input type="file" accept="image/*" />
        </label>

        <div>
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

        <div>
          <h2>Directions</h2>
          {directions.map((direction, index) => (
            <div key={index}>
              <label>
                Step {index + 1}:
                <textarea
                  value={direction}
                  onChange={(e) => handleDirectionChange(index, e)}
                  required
                />
              </label>
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
          <div>
            {selectedTags.map((tag, index) => (
              <span key={index} onClick={() => handleTagRemove(tag)} className="selected-tag">
                {tag} X| |
              </span>
            ))}
          </div>
          <select onChange={handleTagSelect}>
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