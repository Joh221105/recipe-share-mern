import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Object,
    required: true,
  },
  directions: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

export default Recipe;