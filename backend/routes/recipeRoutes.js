import express from 'express';
import { 
  getAllRecipes, 
  createRecipe, 
  getRecipeById, 
  updateRecipe, 
  deleteRecipe, 
  searchRecipes, 
  filterRecipesByTags 
} from '../controllers/recipeController.js';

const router = express.Router();

// get all recipes
router.get('/', getAllRecipes);

// create new recipe
router.post('/', createRecipe);

// get recipe by ID
router.get('/:recipeId', getRecipeById);

// update recipe by ID
router.put('/:recipeId', updateRecipe);

// delete recipe by ID
router.delete('/:recipeId', deleteRecipe);

// get recipes by search query
router.get('/search', searchRecipes);

// get recipes by tag
router.get('/filter', filterRecipesByTags);

export default router;

