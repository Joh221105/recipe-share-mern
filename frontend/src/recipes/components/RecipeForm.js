import React, { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import tags from "../../data/tags";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

const RecipeForm = () => {
  const { userId } = useContext(AuthContext);
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", measurement: "" },
  ]);
  const [directions, setDirections] = useState([""]);
  const [selectedTags, setSelectedTags] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleIngredientChange = (index, event) => {
    const { name, value } = event.target;
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", measurement: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
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
      const response = await fetch("http://localhost:5001/recipe", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
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
    <div className="flex justify-center items-center min-h-screen bg-[#D9E6D9] shadow-2xl py-12">
      <form
        className="bg-background shadow-md rounded-lg p-6 w-full max-w-3xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 border-b-2 border-dashed pb-5 text-text">CREATE A NEW RECIPE</h1>

        <label className="block mb-4 font-semibold text-text">
          Title
          <input
            type="text"
            name="title"
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <label className="block mb-4 font-semibold text-text">
          Description
          <textarea
            name="description"
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24"
          />
        </label>

        <label className="block mb-4 font-semibold text-text">
          Upload Image
          <input
            type="file"
            ref={fileInputRef}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </label>

        <div className="ingredient-section my-6">
          <h2 className="text-xl font-semibold mb-2 text-text">Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-4">
              <label className="block w-full">
                Name
                <input
                  type="text"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </label>
              <label className="block w-full ml-2">
                Amount
                <input
                  type="text"
                  name="amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </label>
              <label className="block w-full ml-2">
                Measurement
                <select
                  name="measurement"
                  value={ingredient.measurement}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
                className="ml-2 p-2 bg-gray-200 hover:cursor-pointer mt-7 text-red-600 hover:bg-red-100 rounded-md"
              >
                <FaMinus className="h-3 w-3" />
              </button>
              {index === ingredients.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="ml-2 p-2 bg-gray-200 text-green-600 mt-7 hover:bg-green-100 rounded-md"
                >
                  <FaPlus className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="direction-section mb-6">
          <h2 className="text-xl font-semibold mb-2 text-text">Directions</h2>
          {directions.map((direction, index) => (
            <div key={index} className="flex items-center mb-4">
              <label className="block w-full">
                Step {index + 1}:
                <textarea
                  name="direction"
                  value={direction}
                  onChange={(e) => handleDirectionChange(index, e)}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24"
                />
              </label>
              <button
                type="button"
                onClick={() => handleRemoveDirection(index)}
                disabled={directions.length === 1}
                className="ml-2 p-2 bg-gray-200 hover:cursor-pointer text-red-600 hover:bg-red-100 rounded-md"
              >
                <FaMinus className="h-3 w-3" />
              </button>
              {index === directions.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddDirection}
                  className="ml-2 p-2 bg-gray-200 text-green-600 hover:bg-green-100 rounded-md"
                >
                  <FaPlus className="h-3 w-3" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-text">Tags</h2>
          <div className="selected-tags mb-2 flex flex-wrap">
            {selectedTags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center border-2 border-secondary rounded-lg text-md font-light text-gray-700 mr-2 my-2 px-3 py-1 cursor-pointer hover:bg-secondary hover:text-white"
                onClick={() => handleTagRemove(tag)}
              >
                {tag} <FaMinus className="ml-1" />
              </span>
            ))}
          </div>
          <select
            className="p-2 border border-gray-300 rounded-md w-full"
            onChange={handleTagSelect}
          >
            <option value="">Add a tag...</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded-md hover:bg-secondary transition duration-200"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
