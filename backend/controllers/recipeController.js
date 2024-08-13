import Recipe from "../models/recipe.js";
import User from "../models/user.js";

// get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    // returns an array of all recipes from the database
    const recipes = await Recipe.find();
    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// create a new recipe in database
export const createRecipe = async (req, res) => {
  const { title, description, tags, author, ingredients, directions } =
    req.body;
  const img = req.file ? req.file.path : "";

  try {
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

// get details of a specific recipe by id from database
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

// update an existing recipe in database
export const updateRecipe = async (req, res) => {
  const { recipeId } = req.params;
  const { title, description, tags, author, ingredients, directions } =
    req.body;
  const img = req.file ? req.file.path : null;

  try {
    const updateFields = {
      title,
      description,
      img,
      tags,
      author,
      ingredients,
      directions,
    };

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      updateFields,
      { new: true }
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// delete a recipe from database
export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;

    if (!recipeId) {
      return res.status(400).json({ message: "Recipe ID required" });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // fetch user and remove the recipe ID from user's created recipe array
    const userId = deletedRecipe.author;
    const user = await User.findById(userId);
    if (user) {
      user.recipes.pull(recipeId);
      await user.save();
    }

    res.json({ message: "Recipe deleted and removed from user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// get recipes by query from database
export const searchRecipes = async (req, res) => {
  try {
    const query = req.query.keyword;

    if (!query) {
      // returns all recipes if no query is provided
      return getAllRecipes(req, res);
    }

    // searches titles with matching keyword, case insensitive, stores in recipes array
    const recipes = await Recipe.find({
      title: { $regex: query, $options: "i" },
    });

    if (recipes.length === 0) {
      return res.status(404).json({ message: "No matching recipes found" });
    }

    res.json({ recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// filter recipes by tags from database
export const filterRecipesByTags = async (req, res) => {
  // extracts tags from query and turns it into an array of strings
  const tagsArray = req.query.tags.split(",");

  try {
    const allRecipes = await Recipe.find();

    // extracts the tags from all the recipes, compares the queried tags and existing recipe tags
    const filteredRecipes = allRecipes.filter((recipe) => {
      const recipeTags = recipe.tags[0] || [];
      return tagsArray.every((tag) => recipeTags.includes(tag));
    });

    if (filteredRecipes.length === 0) {
      return res.json({ message: "No recipes found with the specified tags" });
    }
    res.json({ recipes: filteredRecipes });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Server error" });
  }
};
