import Recipe from "../models/recipe.js";

// get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    // returns recipes, an array of all recipes from database
    const recipes = await Recipe.find();
    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// create a new recipe in database
export const createRecipe = async (req, res) => {

  const { title, description, img, tags, author, ingredients, directions } = req.body;

  try{

    const recipe = new Recipe({
      title,
      description,
      img,
      tags,
      author,
      ingredients,
      directions,
      createdAt: new Date(),
    });

    await recipe.save();

    res.status(201).json({ message: "Recipe created", recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get details of a specific recipe from database
export const getRecipeById = async (req, res) => {
  const { recipeId } = req.params;

  try {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//  update an existing recipe in database
export const updateRecipe = async (req, res) => {
  const { recipeId } = req.params; 

  // assigns the updated fields to variable
  const updateFields = req.body;    

  try {
    // Update recipe matching id with the updateFields content
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, updateFields, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// delete a recipe from database
export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    // checks if recipe id is provided
    if (!recipeId) {
      return res.status(400).json({ message: 'Recipe ID required' });
    }

    const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeId });

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// get recipes by query from database
export const searchRecipes = async (req, res) => {
  try {
    const query = req.query.keyword;

    // checks if query parameter is provided (remove after logic is implemented in front end)
    if (!query) {
      return res.status(400).json({ message: 'Query parameter "keyword" is required' });
    }

    // searches titles with matching keyword, case insensitive, stores in recipes array
    const recipes = await Recipe.find({ title: { $regex: query, $options: 'i' } });

    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No matching recipes founds' });
    }

    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// filter recipes by tags from database
export const filterRecipesByTags = async (req, res) => {
  try {
    const { tags } = req.query;

    // checks if tags were provided (remove after implementing logic in frontend)
    if (!tags) {
      return res.status(400).json({ message: 'Tags are required' });
    }
// turns tags into an array separated at every ','
    const tagsArray = tags.split(',');

    // creates an array of recipes that contain all of the specified tags
    const recipes = await Recipe.find({ tags: { $all: tagsArray } });

    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found with the specified tags' });
    }

    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
