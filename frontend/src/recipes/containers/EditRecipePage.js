// import { useContext, useEffect, useRef, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import Navbar from "../../common/components/Navbar";
// import Footer from "../../common/components/Footer";
// import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
// import tags from '../../data/tags';

// const EditRecipePage = () => {
//   const { userId } = useContext(AuthContext);
//   const [ingredients, setIngredients] = useState([{ name: "", amount: "", measurement: "" }]);
//   const [directions, setDirections] = useState([""]);
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [recipe, setRecipe] = useState(null);
//   const fileInputRef = useRef(null);
//   const navigate = useNavigate();
//   const { recipeId } = useParams();

//   // Fetch the recipe data when the component mounts
//   useEffect(() => {
//     const fetchRecipe = async () => {
//       try {
//         const response = await fetch(`http://localhost:5001/recipe/${recipeId}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch recipe");
//         }
//         const data = await response.json();
//         setRecipe(data.recipe);
//       } catch (error) {
//         console.error("Error fetching recipe:", error);
//       }
//     };

//     fetchRecipe();
//   }, [recipeId]);

//   // Prepopulate fields with existing recipe data
//   useEffect(() => {
//     if (recipe) {
//       setIngredients(JSON.parse(recipe.ingredients) || [{ name: "", amount: "", measurement: "" }]);
//       setDirections(JSON.parse(recipe.directions) || [""]);
//       setSelectedTags(recipe.tags || []);
//     }
//   }, [recipe]);

//   const handleIngredientChange = (index, event) => {
//     const { name, value } = event.target;
//     const newIngredients = [...ingredients];
//     newIngredients[index][name] = value;
//     setIngredients(newIngredients);
//   };

//   const handleAddIngredient = () => {
//     setIngredients([...ingredients, { name: "", amount: "", measurement: "" }]);
//   };

//   const handleRemoveIngredient = (index) => {
//     if (ingredients.length > 1) {
//       const newIngredients = ingredients.filter((_, i) => i !== index);
//       setIngredients(newIngredients);
//     }
//   };

//   const handleDirectionChange = (index, event) => {
//     const newDirections = [...directions];
//     newDirections[index] = event.target.value;
//     setDirections(newDirections);
//   };

//   const handleAddDirection = () => {
//     setDirections([...directions, ""]);
//   };

//   const handleRemoveDirection = (index) => {
//     if (directions.length > 1) {
//       const newDirections = directions.filter((_, i) => i !== index);
//       setDirections(newDirections);
//     }
//   };

//   const handleTagSelect = (event) => {
//     const tag = event.target.value;
//     if (tag && !selectedTags.includes(tag)) {
//       setSelectedTags([...selectedTags, tag]);
//     }
//   };

//   const handleTagRemove = (tagToRemove) => {
//     setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     const formElements = event.target.elements;

//     formData.append("title", formElements.title.value);
//     formData.append("description", formElements.description.value);
//     formData.append("author", userId);

//     const file = fileInputRef.current.files[0];
//     if (file) {
//         formData.append("image", file);
//     }

//     const ingredientsArray = ingredients.map((ingredient) => ({
//         name: ingredient.name,
//         amount: ingredient.amount,
//         measurement: ingredient.measurement,
//     }));
//     formData.append("ingredients", JSON.stringify(ingredientsArray));

//     const directionsArray = directions;
//     formData.append("directions", JSON.stringify(directionsArray));

//     // Ensure that tags are sent as a JSON string
//     formData.append("tags", JSON.stringify(selectedTags));

//     try {
//         const response = await fetch(`http://localhost:5001/recipe/${recipeId}`, {
//             method: "PUT",
//             body: formData,
//         });

//         const result = await response.json();

//         if (response.ok) {
//             console.log("Recipe updated successfully");
//             navigate("/profile");
//         } else {
//             console.log("Error updating recipe:", result.message);
//         }
//     } catch (error) {
//         console.error("Error updating recipe:", error);
//     }
// };


//   // loading state if data is not yet retrieved
//   if (!recipe) {
//     return <div className="text-center text-text">Loading...</div>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen bg-[#D9E6D9]">
//       <Navbar />
//       <div className="flex-grow py-12 flex items-center justify-center">
//         <form
//           className="bg-background shadow-md rounded-lg p-6 w-full max-w-3xl"
//           onSubmit={handleSubmit}
//         >
//           <h1 className="text-2xl font-bold mb-4 border-b-2 border-dashed pb-5 text-text">EDIT RECIPE</h1>

//           <label className="block mb-4 font-semibold text-text">
//             Title
//             <input
//               type="text"
//               name="title"
//               defaultValue={recipe.title}
//               required
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full font-light"
//             />
//           </label>

//           <label className="block mb-4 font-semibold text-text">
//             Description
//             <textarea
//               name="description"
//               defaultValue={recipe.description}
//               required
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24 font-light"
//             />
//           </label>

//           <label className="block mb-4 font-semibold text-text">
//             Upload Image
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             />
//           </label>

//           <div className="ingredient-section my-6">
//             <h2 className="text-xl font-semibold mb-2 text-text">Ingredients</h2>
//             {ingredients.map((ingredient, index) => (
//               <div key={index} className="flex items-center mb-4">
//                 <label className="block w-full">
//                   Name
//                   <input
//                     type="text"
//                     name="name"
//                     value={ingredient.name}
//                     onChange={(e) => handleIngredientChange(index, e)}
//                     required
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                   />
//                 </label>
//                 <label className="block w-full ml-2">
//                   Amount
//                   <input
//                     type="text"
//                     name="amount"
//                     value={ingredient.amount}
//                     onChange={(e) => handleIngredientChange(index, e)}
//                     required
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                   />
//                 </label>
//                 <label className="block w-full ml-2">
//                   Measurement
//                   <select
//                     name="measurement"
//                     value={ingredient.measurement}
//                     onChange={(e) => handleIngredientChange(index, e)}
//                     required
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//                   >
//                     <option value="">Choose...</option>
//                     <option value="Cup">Cup</option>
//                     <option value="Tbsp">Tbsp</option>
//                     <option value="Tsp">Tsp</option>
//                   </select>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveIngredient(index)}
//                   disabled={ingredients.length === 1}
//                   className="ml-2 p-2 bg-gray-200 hover:cursor-pointer mt-7 text-red-600 hover:bg-red-100 rounded-md"
//                 >
//                   <FaMinus className="h-3 w-3" />
//                 </button>
//                 {index === ingredients.length - 1 && (
//                   <button
//                     type="button"
//                     onClick={handleAddIngredient}
//                     className="ml-2 p-2 bg-gray-200 text-green-600 mt-7 hover:bg-green-100 rounded-md"
//                   >
//                     <FaPlus className="h-3 w-3" />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="direction-section mb-6">
//             <h2 className="text-xl font-semibold mb-2 text-text">Directions</h2>
//             {directions.map((direction, index) => (
//               <div key={index} className="flex items-center mb-4">
//                 <label className="block w-full">
//                   Step {index + 1}:
//                   <textarea
//                     name="direction"
//                     value={direction}
//                     onChange={(e) => handleDirectionChange(index, e)}
//                     required
//                     className="mt-1 p-2 border border-gray-300 rounded-md w-full h-24"
//                   />
//                 </label>
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveDirection(index)}
//                   disabled={directions.length === 1}
//                   className="ml-2 p-2 bg-gray-200 hover:cursor-pointer mt-7 text-red-600 hover:bg-red-100 rounded-md"
//                 >
//                   <FaMinus className="h-3 w-3" />
//                 </button>
//                 {index === directions.length - 1 && (
//                   <button
//                     type="button"
//                     onClick={handleAddDirection}
//                     className="ml-2 p-2 bg-gray-200 text-green-600 mt-7 hover:bg-green-100 rounded-md"
//                   >
//                     <FaPlus className="h-3 w-3" />
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="mb-6">
//       <h2 className="text-xl font-semibold mb-2 text-text">Tags</h2>
//       <div className="selected-tags mb-2 flex flex-wrap">
//         {selectedTags.map((tag, index) => (
//           <span
//             key={index}
//             className="inline-flex items-center border-2 border-secondary rounded-lg text-md font-light text-gray-700 mr-2 my-2 px-3 py-1 cursor-pointer hover:bg-secondary hover:text-white"
//             onClick={() => handleTagRemove(tag)}
//           >
//             {tag} <FaMinus className="ml-1" />
//           </span>
//         ))}
//       </div>
//       <select
//         className="p-2 border border-gray-300 rounded-md w-full"
//         onChange={handleTagSelect}
//       >
//         <option value="">Add a tag...</option>
//         {tags.map((tag, index) => (
//           <option key={index} value={tag}>
//             {tag}
//           </option>
//         ))}
//       </select>
//     </div>


//           <button
//             type="submit"
//             className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full"
//           >
//             Update Recipe
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default EditRecipePage;
