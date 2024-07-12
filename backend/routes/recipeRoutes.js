import express from 'express';
import { 
  getAllRecipes, 
  createRecipe, 
  getRecipeById, 
  updateRecipe, 
  deleteRecipe, 
  searchRecipes, 
  filterRecipesByTag 
} from '../controllers/recipeController.js';

const app = express.Router();

app.get('/', getAllRecipes);

app.post('/', createRecipe);

app.get('/:recipeId', getRecipeById);

app.put('/:recipeId', updateRecipe);

app.delete('/:recipeId', deleteRecipe);

app.get('/search', searchRecipes);

app.get('/', filterRecipesByTag);

export default router;

