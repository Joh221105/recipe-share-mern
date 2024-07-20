import React, { useState } from "react";
import tags from "../../../data/tags";
import "./RecipeForm.css";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", measurement: "" },
  ]);
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
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElements = event.target.elements;
    const jsonObject = {};

    // constructing the JSON object
    jsonObject.title = formElements.title.value;
    jsonObject.description = formElements.description.value;
    jsonObject.img = "http://example.com/updated-chicken-tikka-masala.jpg"; // static img url for testing
    jsonObject.author = "test"; // static author for testing

    // creates and populate ingredient array
    jsonObject.ingredients = [];
    const ingredientNames = formElements["ingredient-name"];
    const ingredientAmounts = formElements["ingredient-amount"];
    const ingredientMeasurements = formElements["ingredient-measurement"];

    if (ingredientNames && ingredientAmounts && ingredientMeasurements) {
      for (let i = 0; i < ingredientNames.length; i++) {
        jsonObject.ingredients.push({
          name: ingredientNames[i].value,
          amount: ingredientAmounts[i].value,
          measurement: ingredientMeasurements[i].value,
        });
      }
    }

    // create and populate directions array
    jsonObject.directions = [];
    const directions = formElements["direction"];
    if (directions) {
      for (let i = 0; i < directions.length; i++) {
        jsonObject.directions.push(directions[i].value);
      }
    } else {
      console.error("Direction form elements are missing");
    }

    jsonObject.tags = Array.from(formElements.tags.selectedOptions).map(
      (option) => option.value
    );

    // converts JSON object to a string and sends to backend
    const jsonString = JSON.stringify(jsonObject);

    try {
      const response = await fetch("http://localhost:5001/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error:", error);
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
          <input type="file" />
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
