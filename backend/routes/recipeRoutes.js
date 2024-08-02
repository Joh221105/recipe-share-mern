import express from "express";
import multer from "multer";
import {
  getAllRecipes,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  searchRecipes,
  filterRecipesByTags,
} from "../controllers/recipeController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const app = express.Router();

// get all recipes
app.get("/", getAllRecipes);

// create new recipe with image upload
app.post("/", upload.single("image"), createRecipe);

// get recipes by search query
app.get("/search", searchRecipes);

// get recipes by tag
app.get("/filter", filterRecipesByTags);

// get recipe by ID
app.get("/:recipeId", getRecipeById);

// update recipe by ID with image upload
app.put("/:recipeId", upload.single("image"), updateRecipe);

// delete recipe by ID
app.delete("/:recipeId", deleteRecipe);

export default app;
