import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [isSaved, setIsSaved] = useState(); // Set initial state to false
  const { userId} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5001/recipe/${recipeId}`);
        if (!response.ok) throw new Error("Failed to fetch recipe");
  
        const data = await response.json();
        data.recipe.ingredients = JSON.parse(data.recipe.ingredients || "[]");
        data.recipe.directions = JSON.parse(data.recipe.directions || "[]");
        data.recipe.tags = JSON.parse(data.recipe.tags || "[]");
        setRecipe(data.recipe);
  
        // Fetch the current user's data, not the author's
        const userResponse = await fetch(`http://localhost:5001/user/${userId}`);
        if (!userResponse.ok) throw new Error("Failed to fetch user profile");
  
        const userData = await userResponse.json();
        setAuthorName(data.recipe.author); // Assuming the author name is directly available
  
        // Check if the recipe is saved by the current user
        const savedStatus = userData.user.saved.includes(recipeId);
        setIsSaved(savedStatus); // Set isSaved based on the current user's saved recipes
      } catch (error) {
        console.error("Error fetching recipe or user:", error);
      }
    };
  
    fetchRecipe();
  }, [recipeId, userId]); // Make sure to include userId in dependencies
  

  if (!recipe) return <div className="text-center text-text">Loading...</div>;

  const { title, description, tags, createdAt, ingredients, directions, author } = recipe;

  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={index} className="text-text">
      {ingredient.name}: {ingredient.amount} {ingredient.measurement}
    </li>
  ));

  const directionsList = directions.map((step, index) => (
    <li key={index} className="text-text">
      {step}
    </li>
  ));

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5001/recipe/${recipeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete recipe");
      }

      const data = await response.json();
      console.log(data.message);
      navigate('/profile');
    } catch (error) {
      console.error("Error deleting recipe:", error.message);
    }
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        // If already saved, remove the recipe
        const response = await fetch(`http://localhost:5001/user/${userId}/removeRecipe`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipeId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to remove recipe");
        }

        setIsSaved(false); // Update the state to reflect the removal
        console.log("Recipe removed from saved recipes");
      } else {
        // If not saved, save the recipe
        const response = await fetch(`http://localhost:5001/user/${userId}/saveRecipe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipeId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to save recipe");
        }

        setIsSaved(true); // Update the state to reflect the save
        console.log("Recipe saved");
      }
    } catch (error) {
      console.error(`Error updating recipe:`, error.message);
    }
  };

  const imageUrl = recipe.img ? `http://localhost:5001/${recipe.img}` : "";

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border-2 border-[#2A9D8F] shadow-2xl rounded-lg my-10">
      {author === userId ? (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 mb-4"
        >
          Delete Recipe
        </button>
      ) : (
        // display a filled or outlined heart based on isSaved
        isSaved ? (
          <AiFillHeart
            onClick={handleSave}
            className="text-[#E76F51] text-3xl cursor-pointer mb-4"
            title="Saved"
          />
        ) : (
          <AiOutlineHeart
            onClick={handleSave}
            className="text-[#264653] text-3xl cursor-pointer hover:text-[#E76F51] mb-4"
            title="Save Recipe"
          />
        )
      )}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-80 object-cover rounded-lg mb-6"
      />
      <h2 className="text-2xl font-bold text-[#264653] uppercase border-b-2 py-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-[#D9E6D9] rounded-lg shadow-inner">
          <p className="text-[#264653] font-semibold">Author:</p>
          <p className="text-[#264653] font-light">{authorName}</p>
        </div>
        <div className="p-4 bg-[#D9E6D9] rounded-lg shadow-inner">
          <p className="text-[#264653] font-semibold">Date Created:</p>
          <p className="text-[#264653] font-light">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="col-span-1 sm:col-span-2 p-4 bg-[#D9E6D9] rounded-lg shadow-inner">
          <p className="text-[#264653] font-semibold">Tags:</p>
          <p className="text-[#264653] font-light">
            {Array.isArray(tags) ? tags.join(", ") : tags}
          </p>
        </div>
      </div>
      <div className="my-5 py-4 border-t border-b border-gray-300">
        <h3 className="text-lg font-semibold text-[#264653] mb-2">
          Description
        </h3>
        <p className="text-[#264653] leading-relaxed">
          {description || "No description provided."}
        </p>
      </div>
      <h3 className="text-xl font-semibold text-[#264653] mt-6 mb-2">
        Ingredients:
      </h3>
      <ul className="list-disc list-inside mb-4 text-[#264653]">
        {ingredientsList}
      </ul>
      <h3 className="text-xl font-semibold text-[#264653] mt-6 mb-2">
        Directions:
      </h3>
      <ol className="list-decimal list-inside mb-4 text-[#264653]">
        {directionsList}
      </ol>
    </div>
  );
};

export default RecipeDetail;
