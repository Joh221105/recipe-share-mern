import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import tags from "../../../data/tags"; 
import { useNavigate } from "react-router-dom"; 
import "./RecipeForm.css";

const RecipeForm = () => {
  const { userId } = useContext(AuthContext); // retrieves user ID from AuthContext
  const [ingredients, setIngredients] = useState([ // manages a list of ingredients
    { name: "", amount: "", measurement: "" },
  ]); 
  const [directions, setDirections] = useState([""]); // manages a list of directions
  const [selectedTags, setSelectedTags] = useState([]); // stores the selected tags
  const fileInputRef = useRef(null); // reference for the image upload
  const navigate = useNavigate(); // hook for navigation

  // handles changes in the ingredient fields
  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value; // updates the specific ingredient field based on user input
    setIngredients(newIngredients);
  };

  // function to add a new ingredient
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", measurement: "" }]);
  };

  // function to remove an ingredient 
  const handleRemoveIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index); // removes the ingredient at the specified index
      setIngredients(newIngredients);
    }
  };

  // function to handle changes in the direction step
  const handleDirectionChange = (index, event) => {
    const newDirections = [...directions];
    newDirections[index] = event.target.value; // updates the specific direction field based on user input
    setDirections(newDirections);
  };

  // function to add a new direction step
  const handleAddDirection = () => {
    setDirections([...directions, ""]);
  };

  // function to remove a direction step
  const handleRemoveDirection = (index) => {
    if (directions.length > 1) {
      const newDirections = directions.filter((_, i) => i !== index); // removes the step at the specified index
      setDirections(newDirections);
    }
  };

  // function to handle the selection of tags
  const handleTagSelect = (event) => {
    const tag = event.target.value;
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]); // adds the selected tagto state if not selected already
    }
  };

  // function to remove a selected tag
  const handleTagRemove = (tagToRemove) => {
    setSelectedTags((prevTags) =>
      prevTags.filter((tag) => tag !== tagToRemove)
    );
  };

  // function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const formData = new FormData();
    const formElements = event.target.elements;

    // appends form data to be sent to the backend
    formData.append("title", formElements.title.value);
    formData.append("description", formElements.description.value);
    formData.append("author", userId);

    const file = fileInputRef.current.files[0]; // gets the uploaded file
    if (file) {
      formData.append("image", file);
    }

    // converts ingredients and directions arrays to JSON strings
    const ingredientsArray = ingredients.map((ingredient) => ({
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
      // POST request to create a new recipe
      const response = await fetch("http://localhost:5001/recipe", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // If the recipe is successfully created, add it to the user's created recipes
        await fetch(`http://localhost:5001/user/${userId}/addRecipe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipeId: result.recipe._id }),
        });

        console.log("Recipe added to user's created recipes");
        navigate("/profile");
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
            
              <button
                type="button"
                onClick={() => handleRemoveIngredient(index)}
                disabled={ingredients.length === 1}
              >
                -
              </button>

              {index === ingredients.length - 1 && (
                <button type="button" onClick={handleAddIngredient}>
                  +
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
                -
              </button>
         
              {index === directions.length - 1 && (
                <button type="button" onClick={handleAddDirection}>
                  +
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
